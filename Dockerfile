FROM artifacts.msap.io/mulesoft/core-paas-base-image-node-16:v4.7.26 as BUILD

ENV FIPS_ENABLED=false

WORKDIR /usr/src/app

USER root

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY . .

RUN chown -R app:app . \
    && npm ci

USER app
ARG GH_TOKEN
ARG SECRET_KEY
ARG GIT_BRANCH
RUN npx gulp release
