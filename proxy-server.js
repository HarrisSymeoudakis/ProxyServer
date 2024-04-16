const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
app.use(cors());

const target = 'https://retail-services.cegid.cloud';

const proxyMiddleware = createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Allow specific HTTP methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    }
});

app.use('/', proxyMiddleware);

const port = 3000;
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
