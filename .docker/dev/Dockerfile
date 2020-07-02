# ./docker/php/Dockerfile
FROM node:buster-slim

ENV NODE_ENV=development

ARG USER_NAME
ARG USER_ID

RUN apt-get update && apt-get install -y \
    curl procps inetutils-ping net-tools iproute2 git vim vim-tiny sudo
RUN useradd -g users -G root,www-data,sudo -u ${USER_ID} ${USER_NAME} -s /bin/bash && \
    echo "%sudo   ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN npm i -g @nestjs/cli

# -- Add Tini --
ENV TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

ENTRYPOINT ["/tini", "--", "docker-entrypoint.sh"]
CMD ["sleep", "infinity"]
