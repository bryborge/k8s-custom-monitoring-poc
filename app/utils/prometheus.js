const Prometheus = require('prom-client');
const ResponseTime = require('response-time');

/**
 * Collect default metrics.
 */
module.exports.startCollection = () => {
  Prometheus.collectDefaultMetrics();
};

module.exports.requestCounters = (req, res, next) => {
  if (req.path !== '/metrics') {
    numOfRequests.inc({ method: req.method });
    pathsTaken.inc({ path: req.path });
  }
  next();
}

module.exports.responseCounters = ResponseTime( (req, res, time) => {
  if (req.url !== '/metrics') {
    responses.labels(req.method, req.url, res.statusCode).observe(time);
  }
});

/**
 * Add the /metrics endpoint.
 * @param App
 */
module.exports.addMetricsRoute = function (App) {
  App.get('/metrics', (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(Prometheus.register.metrics());
  });
};

/**
 * Helpers
 */

const numOfRequests = new Prometheus.Counter({
  name: 'numOfRequests',
  help: 'Number of requests made',
  labelNames: ['method']
});

const pathsTaken = new Prometheus.Counter({
  name: 'pathsTaken',
  help: 'Paths taken in the app',
  labelNames: ['path']
});

const responses = new Prometheus.Summary({
  name: 'responses',
  help: 'Response time in milliseconds',
  labelNames: ['method', 'path', 'status']
});
