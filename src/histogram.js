const { Histogram } = require('prom-client');

const histogramCostTime = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'http 响应耗时',
    labelNames: ['path', 'code'],
    // 不传，默认是[0.005,0.01,0.25,0.5,1,2.5,5,10]
    buckets: [1, 5, 10, 50, 100, 250, 500],
});

setInterval(() => {
    // 模拟http 响应
    histogramCostTime
        .labels({
            code: 200,
            path: '/path1',
        })
        .observe(Math.random() * 10);
    histogramCostTime
        .labels({
            code: 200,
            path: '/path2',
        })
        .observe(Math.random() * 100);
    histogramCostTime
        .labels({
            code: 500,
            path: '/path1',
        })
        .observe(Math.random() * 600);
}, 1000);

/**
 * 请求平均耗时: rate(http_request_duration_seconds_sum[1m])/rate(http_request_duration_seconds_count[1m])
 * 汇总: sum(rate(http_request_duration_seconds_sum[1m]))/sum(rate(http_request_duration_seconds_count[1m]))
 */

module.exports = {
    histogramCostTime,
};
