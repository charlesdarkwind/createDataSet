require('dotenv').config({ path: 'variables.env' });
const moment = require('moment');
const fs = require('fs');
let delay = 0;

// Intervals: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
//*********************
const grain = '15m';
//*********************

const main = {
    created: Date.now(), // When the data set was made
    time: {},
    closes: {},
    open: {},
    low: {},
    high: {},
    volume: {},
};

const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true,
    recvWindow: 120000,
    test: true
});

binance.exchangeInfo((error, data) => {
    if (error) throw Error(error);

    console.log('Gathering data...');

    // Declare allPairs
    const allPairs = data.symbols.filter(pair => pair.quoteAsset == 'BTC').map(pair => pair.symbol);

    // get ohlc
    allPairs.map(pair => {
        setTimeout(() => {
            binance.candlesticks(pair, grain, (err, ticks, symbol) => {

                if (err) throw Error(err);


                let t = [], h = [], l = [], c = [], o = [], v = [];

                ticks.map(tick => {
                    t.push(parseFloat(tick[0]));
                    o.push(parseFloat(tick[1]));
                    h.push(parseFloat(tick[2]));
                    l.push(parseFloat(tick[3]));
                    c.push(parseFloat(tick[4]));
                    v.push(parseFloat(tick[5]));
                });

                main.time[symbol] = t;
                main.open[symbol] = o;
                main.high[symbol] = h;
                main.low[symbol] = l;
                main.closes[symbol] = c;
                main.volume[symbol] = v;

            });
        }, delay);
        delay += 200;
    });

    setTimeout(() => {
        const tag = moment().format('YYYY_MMMD');
        fs.writeFileSync(`./dataSets/dataSet_${tag}.json`, JSON.stringify(main));
        fs.writeFileSync('./exchangeInfos.json', JSON.stringify(data, null, 4));
        console.log(`dataSet_${tag}.json done, refresh files explorer!`);
        process.exit();
    }, allPairs.length * 400);
});