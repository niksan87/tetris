const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const express = require('express');
const LOCAL_HOST_PORT = 5000;
const config = require('./webpack.config');
const compiler = webpack(config)

const app = express();

app.use(express.static(__dirname));
app.use(
    webpackDevMiddleware(compiler, {
        stats: { colors: true },
        reload: true,
        quiet: true
    })
);

const router = express.Router();
router.get('/', (_, res) => res.render('index'));
app.use(router);

app.listen(LOCAL_HOST_PORT, () => {
    const color = '\x1b[46m';
    console.log('Listening on', color, `http://localhost:${LOCAL_HOST_PORT}`, `\x1b[0m`);
});
