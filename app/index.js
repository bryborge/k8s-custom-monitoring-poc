'use strict'

// Express Framework
const express = require('express');
const app = express();

// Prometheus Client
const Prometheus = require('prom-client');

// Prometheus Metrics
const httpRequestDuration = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
});

// The port the app is served on
const PORT = 3000;

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});

// App root GET endpoint
app.get('/', (req, res, next) => {
  setTimeout(() => {
    res.json({ message: 'Hello World!' });
    next();
  },
  Math.round(Math.random() * 200));
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', Prometheus.register.contentType);
  res.end(Prometheus.register.metrics());
});

// Runs after each requests
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDuration
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs);

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
