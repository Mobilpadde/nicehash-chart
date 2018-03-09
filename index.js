const got = require('got');
const wunderbar = require('@gribnoysup/wunderbar');
const color = require('string-to-color');

const cfg = require('./cfg.json');
const algos = Object.values(require('./algo.json')).map((x, i) => ({
    color: color(x),
    algo: x,
}));

const fn = (async () => {
    const resp = await got(`${cfg.url}${cfg.addr}`);
    const stats = JSON.parse(resp.body).result.stats;

    const data = stats.map((x) => {
        const a = algos[x.algo];

        return {
            value: parseFloat(x.balance),
            label: a.algo,
            color: a.color,
        };
    });

    const { chart, scale, legend } = wunderbar(data, {
        sort: "max",
    });

    console.clear();
    console.log();
    console.log(chart);
    console.log(scale);
    console.log();
    console.log(legend);
    console.log();
});

fn();
setInterval(fn, 1000 * 30);
