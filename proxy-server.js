const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Update * to your specific origin if needed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

const target = 'https://retail-services.cegid.cloud';
app.use((req, res, next) => { 
    console.log('Incoming request: ${req.method} ${req.url}'); 
    next(); 
});
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
