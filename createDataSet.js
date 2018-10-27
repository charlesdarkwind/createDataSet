"use strict";
require('dotenv').config({ path: 'variables.env' });
process.env.UV_THREADPOOL_SIZE = 128;
const moment = require('moment');
const fs = require('fs');
const grains = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
const stamp = moment().format('YYYY-MMM-D-H-mm');
const split = stamp.split('-');
const datehuman = `${split[2]}-${split[1]}-${split[0]}_${split[3]}h${split[4]}`;
let main = {};
let delay = 0;

if (!fs.existsSync('./dataSets')) fs.mkdirSync('./dataSets');

const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true,
    recvWindow: 3200000,
    test: true
});

console.log('Getting latest exchange infos...'); // https://api.binance.com/api/v1/exchangeInfo

binance.exchangeInfo((error, data) => {
    if (error) console.error(error);

    fs.writeFileSync('./exchangeInfos.json', JSON.stringify(data, null, 4));
    const allPairs = data.symbols.filter(pair => pair.quoteAsset == 'BTC').map(pair => pair.symbol);
    console.log(`Gathering data for ${allPairs.length} pairs and ${grains.length} grains.`);

    grains.map(grain => { // Iterate grains

        main[grain] = {
            created: Date.now(),
            grain,
            time: {},
            closes: {},
            open: {},
            low: {},
            high: {},
            volume: {},
        };

        // Iterate over pairs
        allPairs.map(pair => { /*

            * Delay queries so we don't bust the limit of 1200 requests per min
            * 1 min / 1200 = 50ms, and we have 2280 queries (15 grains * 152 pairs) */

            setTimeout(() => {
                binance.candlesticks(pair, grain, (err, ticks, symbol) => {
                    if (err) {
                        console.error(err, err.body || '');
                        console.log(symbol, grain, grain);
                    }
                    if (!grain || !grain) {
                        console.log(symbol, grain, grain);
                    }

                    let t = [], h = [], l = [], c = [], o = [], v = [];
                    ticks.map(tick => {
                        t.push(parseFloat(tick[0]));
                        o.push(parseFloat(tick[1]));
                        h.push(parseFloat(tick[2]));
                        l.push(parseFloat(tick[3]));
                        c.push(parseFloat(tick[4]));
                        v.push(parseFloat(tick[5]));
                    });

                    main[grain].time[symbol] = t;
                    main[grain].open[symbol] = o;
                    main[grain].high[symbol] = h;
                    main[grain].low[symbol] = l;
                    main[grain].closes[symbol] = c;
                    main[grain].volume[symbol] = v;

                    // Ecrire un fichier .json pour chaque grain,
                    // windows écrase notre fichier 1m par le 1M.., on utilisera '1MO' pour le filename
                    fs.writeFileSync(`./dataSets/${datehuman}_${grain === '1M' ? '1MO' : grain}.json`, JSON.stringify(main[grain]));
                    console.log(`Done ${grain}, ${symbol}`);

                    if (grain == grains.length - 1 && symbol == allPairs.length - 1) {
                        console.log(`Done all, refresh explorer!`);
                        process.exit();
                    }
                });
            }, delay); delay += 55;
        });
    });
});

