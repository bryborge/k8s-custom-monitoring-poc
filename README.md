# K8s Custom Monitoring Example

This is a proof of concept that demonstrates custom monitoring and autoscaling using
[Prometheus](https://prometheus.io/)
and
[Grafana](https://grafana.com/).

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

1.  You can get to the services in a web browser.  Access the application at `localhost:30080` and Prometheus at `localhost:30000`
