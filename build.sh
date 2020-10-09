#!/bin/sh

BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
VCS_REF=$(git log --format="%H" -n 1)

docker build -f .docker/Dockerfile -t ${IMAGE} --rm \
    --build-arg WORKDIR=$APP_PATH} \
    --build-arg BUILD_DATE=${BUILD_DATE} \
    --build-arg VCS_REF=${VCS_REF} \
    --build-arg VERSION=${VERSION} \
    .
