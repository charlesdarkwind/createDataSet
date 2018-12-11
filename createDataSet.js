
/*  Produces about 600k elements JSON array in "row" format for later CSV conversion
    (500 bars * 150 pairs * 8 intervals)
    Takes about 5 mins with intel i5 */

require('dotenv').config({ path: 'variables.env' });
process.env.UV_THREADPOOL_SIZE = 128;
const moment = require('moment');
const async = require("async");
const fs = require('fs');
const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '4h', '1d'];
const date = moment().format('YYYY-MMM-D-H-mm').split('-');
const datehuman = `${date[2]}-${date[1]}-${date[0]}_${date[3]}h${date[4]}`;
let failedPairs = [];
let dataset = [];
let runsCount = 0;
let pairsCount = 0;

// create /dataSets if not there
if (!fs.existsSync('./dataSets')) fs.mkdirSync('./dataSets');

const binance = require('node-binance-api')().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET,
    useServerTime: true,
    recvWindow: 3200000,
    test: true
});

const queryData = ([pair, interval], cb) => {
    binance.candlesticks(pair, interval, (err, ticks, symbol) => {
        if (err) {
            console.log(err);
            failedPairs.push([pair, interval]); // keep track of errors
            cb(null, `Error ${interval}, ${symbol}`);
            return;
        }
        ticks.map(tick => {
            dataset.push({
                symbol,
                interval,
                time: parseFloat(tick[0]),
                open: parseFloat(tick[1]),
                high: parseFloat(tick[2]),
                low: parseFloat(tick[3]),
                close: parseFloat(tick[4]),
                volume: parseFloat(tick[5])
            });
        });
        process.stdout.write('\033c');
        console.log(`Done: ${symbol}\t${interval}\t( ${(runsCount / (intervals.length * pairsCount) * 100).toFixed(1)}% )`);
        runsCount++;
        cb(null, `Done ${interval}, ${symbol}`);
    });
};

// Save to .json
const saveDatasetToFile = () => {
    fs.writeFile(`./dataSets/dataset_${datehuman}.json`, JSON.stringify(dataset), () => {
        console.log('File saved, refresh explorer.');
        process.exit(0);
    });
};

// Loop queries in series with parameters
const queryLoop = params => {
    async.mapSeries(params, queryData, () => {
        console.log(failedPairs); // re-run erroed pairs
        if (failedPairs.length > 0) {
            queryLoop(failedPairs);
            failedPairs = [];
        } else saveDatasetToFile();
    });
};

// prepare all parameters [[pair, interval], ...]
const makeArr = pairs => {
    const params = [];
    pairs.map(pair => {
        dataset[pair] = {};
        intervals.map(interval => {
            if (!dataset[pair][interval]) dataset[pair][interval] = {};
            params.push([pair, interval]);
        });
    });
    queryLoop(params);
};


// Get exchange infos and list of pairs at
// https://api.binance.com/api/v1/exchangeInfo
binance.exchangeInfo((error, data) => {
    if (error) console.error(error);
    fs.writeFileSync('./exchangeInfos.json', JSON.stringify(data, null, 4));
    const allPairs = data.symbols
        .filter(pair => pair.quoteAsset == 'BTC')
        .map(pair => pair.symbol);
    pairsCount = allPairs.length;
    makeArr(allPairs);
});