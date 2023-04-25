FROM artifacts.msap.io/mulesoft/core-paas-base-image-node-18:v4.7.29 as BUILD

ENV FIPS_ENABLED=false

WORKDIR /usr/src/app

USER root

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY . .

RUN chown -R app:app . \
    && npm ci

USER app
ARG GIT_BRANCH
ARG GH_TOKEN
ARG SECRET_KEY
RUN npx gulp release
