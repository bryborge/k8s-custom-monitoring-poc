'use strict';

const Express = require('express');
const Prometheus = require('./utils/prometheus');

const App = Express();
const PORT = 3000;

/**
 * Get our Counters.
 */
App.use(Prometheus.requestCounters);
App.use(Prometheus.responseCounters);

/**
 * Kick off default metrics collection.
 */
Prometheus.startCollection();

/**
 * GET '/'.
 */
App.get('/', (req, res, next) => {
  setTimeout(() => {
    res.json({ message: 'Hello World!' });
    next();
  },
  Math.round(Math.random() * 200)); // fake server response timing per request
});

/**
 * GET '/metrics'.
 */
Prometheus.addMetricsRoute(App);

/**
 * Serve the application.
 */
App.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
