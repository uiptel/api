FROM node:buster-slim

EXPOSE 3000

ENV NODE_ENV=development

ARG USER_NAME
ARG USER_ID

RUN apt-get update && apt-get install -y \
    curl procps inetutils-ping net-tools iproute2 git vim vim-tiny sudo
RUN useradd -g users -G root,www-data,sudo -u ${USER_ID} ${USER_NAME} -s /bin/bash && \
    echo "%sudo   ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN npm i -g @nestjs/cli

CMD ["sleep", "infinity"]
