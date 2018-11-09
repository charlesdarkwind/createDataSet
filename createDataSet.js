require('dotenv').config({ path: 'variables.env' });
process.env.UV_THREADPOOL_SIZE = 128;
const moment = require('moment');
const async = require("async");
const fs = require('fs');
const intervals = ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'];
const date = moment().format('YYYY-MMM-D-H-mm').split('-');
const datehuman = `${date[2]}-${date[1]}-${date[0]}_${date[3]}h${date[4]}`;
let failedPairs = [];
let dataset = {};
let count = 0;

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

        const t = [], h = [], l = [], c = [], o = [], v = [];
        ticks.map(tick => {
            t.push(parseFloat(tick[0]));
            o.push(parseFloat(tick[1]));
            h.push(parseFloat(tick[2]));
            l.push(parseFloat(tick[3]));
            c.push(parseFloat(tick[4]));
            v.push(parseFloat(tick[5]));
        });

        const obj = dataset[symbol][interval];
        obj.time = t;
        obj.open = o;
        obj.high = h;
        obj.low = l;
        obj.close = c;
        obj.volume = v;

        process.stdout.write('\033c');
        console.log(`Done: ${symbol}\t${interval}\t( ${(count / 2280 * 100).toFixed(1)}% )`);
        count++;
        cb(null, `Done ${interval}, ${symbol}`);
    });
};

// Save to .json
const savedatasetToFile = () => {
    fs.writeFile(`./dataSets/dataset_${datehuman}.json`, JSON.stringify(dataset), () => {
        console.log('File saved, refresh explorer.');
        process.exit(0);
    });
};

// Loop queries in series
const queryLoop = params => {
    async.mapSeries(params, queryData, () => {
        console.log(failedPairs); // re-run erroed pairs
        if (failedPairs.length > 0) {
            queryLoop(failedPairs);
            failedPairs = [];
        } else savedatasetToFile();
    });
};

// normalizes params [[pair, interval], ...]
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
    makeArr(allPairs);
});