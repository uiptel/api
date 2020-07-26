#!/bin/bash

. .env
. .funcs

APP_VERSION=$(app_version)
APP_NAME=$(app_name)
LOCAL_PORT=127.0.0.1:${APP_PORT}
CONTAINER_NAME=${APP_NAME}_prod
PRODUCTION_IMAGE=${REGISTRY}/${APP_NAME}:${APP_VERSION}
COMMAND=${@:-sleep.js}

# -- check for already started container for this application --
CONTAINER_ID=`docker ps -q --filter="name=${CONTAINER_NAME}"`
if [ -n "${CONTAINER_ID}" ]; then
	echo "stop container => `docker container stop ${CONTAINER_ID}`"
fi

echo "start production image => ${PRODUCTION_IMAGE}"
docker run -e "MYSQL_HOST=192.168.77.153" \
		-e "MYSQL_DATABASE=uiptel" \
      	-e "MYSQL_USER=uiptel" \
      	-e "MYSQL_PASSWORD=pa\$\$4uIPtel" \
		--rm -p ${LOCAL_PORT}:${APP_PORT}/tcp  --name ${CONTAINER_NAME} ${PRODUCTION_IMAGE} ${COMMAND}
