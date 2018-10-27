"use strict";
require('dotenv').config({ path: 'variables.env' });
const moment = require('moment');
const fs = require('fs');
const grain = process.argv[2];
const grains = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M']
let delay = 0, allPairs, t = [], h = [], l = [], c = [], o = [], v = [];

if (!grain || !grains.includes(grain))
    console.error('Please provide a grain: yarn createDataSet [1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M]')

const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true,
    recvWindow: 300000,
    test: true
});

const main = {
    created: Date.now(),
    time: {},
    closes: {},
    open: {},
    low: {},
    high: {},
    volume: {},
};

binance.exchangeInfo((error, data) => {
    if (error) console.error(error);

    fs.writeFileSync('./exchangeInfos.json', JSON.stringify(data, null, 4));

    allPairs = data.symbols
        .filter(pair => pair.quoteAsset == 'BTC')
        .map(pair => pair.symbol);

    // Queries
    Promise.all(allPairs.map(pair => {
        return new Promise(resolve => {
            binance.candlesticks(pair, grain, (err, ticks, symbol) => {
                if (err) {
                    console.error(err.body || error);
                    throw Error(err);
                }
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
                resolve();
            });
        });

    })).then(() => {
        let tag = moment().format('D_MMM_HH-') + grain;
        fs.writeFileSync(`./dataSets/dataSet_${tag}.json`, JSON.stringify(main));
        console.log(`dataSet_${tag}.json done, refresh files explorer!`);
        process.exit();
    }).catch(err => console.error(err.body || error));
});