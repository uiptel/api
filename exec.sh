#!/bin/bash

. .env
. .funcs

APP_VERSION=$(app_version)
CONTAINER=${APP_NAME}.${APP_ENV}_v${APP_VERSION:-local}
USER=`id -u -n`
COMMAND=${@:-bash}

echo "exec command => \"${COMMAND}\" in container => ${CONTAINER}"
docker exec -it -u ${USER} ${CONTAINER} ${COMMAND}
