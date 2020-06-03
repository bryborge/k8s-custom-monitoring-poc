# K8s Custom Monitoring Example

This is a proof of concept that demonstrates custom monitoring and autoscaling using
[Prometheus](https://prometheus.io/)
and
[Grafana](https://grafana.com/).

## Overview

The sample application is a simple "hello world" API.
The application request and response count is monitored by Prometheus,
which admittedly isn't that interesting on it's own,
but Prometheus is highly customizable and can monitor far more complex and interesting data points.
This body of work is simply to illustrate how one might wire up custom metrics for an application orchestrated by K8s.

## Requirements

* Docker
* Docker Compose
* Kubernetes (and `kubectl`)

## Up and Running

1.  Pull down this repo and `cd` into the project directory
1.  Build the image
    
    ```sh
    docker-compose build
    ```
    
1.  Create new application services

    ```sh
    kubectl apply -f infrastructure/kubernetes/deployment.yml -f infrastructure/kubernetes/service.yml
    ```

1.  Create new prometheus service

    ```sh
    kubectl apply -f infrastructure/prometheus/service.yml -f infrastructure/prometheus/deployment.yml -f infrastructure/prometheus/config_map.yml
    ```

1.  Create new grafana service

    ```sh
    kubectl apply -f infrastructure/grafana/deployment.yml -f infrastructure/grafana/pvc.yml -f infrastructure/grafana/service.yml  
    ```

1.  You can get to the services in a web browser.
    Access the application at `localhost:30080`, Prometheus at `localhost:30000`, and Grafana at `localhost:3000`.
    Furthermore,
    you can see all metric data output exposed at `localhost:30080/metrics`.
