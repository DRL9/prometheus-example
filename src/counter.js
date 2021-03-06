const { Counter } = require('prom-client');

const counterHttp = new Counter({
    help: '计数器',
    name: 'http_request_total',
    labelNames: ['code', 'path'],
});

setInterval(() => {
    // 模拟http 请求
    counterHttp.inc(
        {
            code: 200,
            path: '/path1',
        },
        2
    );
    counterHttp.inc(
        {
            code: 200,
            path: '/path2',
        },
        1
    );
    counterHttp.inc(
        {
            code: 404,
            path: '/path1',
        },
        1
    );
}, 1 * 1000);

/**
 * 每分钟请求数：increase(http_request_total[1m])
 * 汇总: sum(increase(http_request_total[1m]))
 */

module.exports = { counterHttp };
