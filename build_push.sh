#bin/bash

version=1.0.1
docker build -t utiuti12345/twitter-ndoe-api:${version} . && docker push utiuti12345/twitter-ndoe-api:${version}
