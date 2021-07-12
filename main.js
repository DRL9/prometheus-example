const Koa = require('koa');
const { Registry } = require('prom-client');
const fs = require('fs');

const registry = new Registry();

const app = new Koa();

app.use(async (ctx) => {
    ctx.body = await registry.metrics();
});

const PORT = 8100;
if (require.main === module) {
    fs.readdirSync(__dirname + '/src').forEach((file) => {
        const module = require(__dirname + '/src/' + file);
        Object.keys(module).forEach((c) => {
            registry.registerMetric(module[c]);
        });
    });

    app.listen(PORT, () => {
        console.log(`server start on ${PORT}`);
    });
}
