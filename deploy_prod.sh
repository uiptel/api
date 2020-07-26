#!/bin/bash

. .env
. .funcs

APP_VERSION=$(app_version)
APP_NAME=$(app_name)
CONTAINER=${SERVICE}
DEPLOYMENT=${SERVICE}
PRODUCTION_IMAGE=${REGISTRY}/${APP_NAME}:${APP_VERSION}

echo ">>>>>>>>>>> push image => \"${PRODUCTION_IMAGE}\" to docker hub ..."
docker push ${PRODUCTION_IMAGE}
DIGEST_IMAGE=$(docker inspect --format='{{index .RepoDigests 0}}' ${PRODUCTION_IMAGE})

[ -z "${DIGEST_IMAGE}" ] && echo "!!! exit due digest image not set"

echo ">>>>>>>>>>> deploy image => \"${DIGEST_IMAGE}\" to container => \"${CONTAINER}@${DEPLOYMENT}\" ..."
kubectl set image deployment/${DEPLOYMENT} ${CONTAINER}=${DIGEST_IMAGE} --namespace=${NAMESPACE}
kubectl set env deployment/${DEPLOYMENT} DIGEST_IMAGE=${DIGEST_IMAGE} --namespace=${NAMESPACE}
