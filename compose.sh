#!/bin/bash

. .env
. .funcs

export USER_NAME=`id -u -n` USER_UID=`id -u` APP_VERSION=$(app_version) APP_NAME=$(app_name)

echo "application => ${APP_NAME}, version => ${APP_VERSION}"
docker-compose ${@}
