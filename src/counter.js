const { Counter } = require('prom-client');

const counter1 = new Counter({
    help: '计数器',
    name: 'count1',
    labelNames: ['label1'],
});

setInterval(() => {
    counter1.inc(
        {
            label1: 'he',
        },
        10
    );
}, 1000);
module.exports = {
    counter1,
};
