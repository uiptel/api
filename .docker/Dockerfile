# ---- BUILD IMAGE ----
FROM node:alpine AS builder

WORKDIR /app
COPY . .
RUN mv .env.prod .env
RUN npm ci
RUN npm run build

# ---- PROD IMAGE ----
FROM node:alpine

ARG BUILD_DATE
ARG VCS_REF
ARG VERSION
ARG WORKDIR

# Labels.
LABEL maintainer="ryzhov@uiptel.com"
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.version=$VERSION

ENV BUILD_DATE=${BUILD_DATE} VCS_REF=${VCS_REF} VERSION=${VERSION} NODE_ENV=production
WORKDIR ${WORKDIR}
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/ormconfig.js /app/package.json /app/package-lock.json /app/.env ./
RUN npm ci && npm cache clean --force

CMD ["dist/src/main"]
