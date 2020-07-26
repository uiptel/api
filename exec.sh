#!/bin/bash

. .env
. .funcs

APP_VERSION=$(app_version)
APP_NAME=$(app_name)
CONTAINER=${APP_NAME}_${APP_ENV}
USER=`id -u -n`
COMMAND=${@:-bash}

echo "exec command => \"${COMMAND}\" in container => ${CONTAINER}"
docker exec -it -u ${USER} ${CONTAINER} ${COMMAND}
