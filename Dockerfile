FROM artifacts.msap.io/mulesoft/core-paas-base-image-node-18:v4.7.51

ARG MULE_NPM_REGISTRY=nexus3.build.msap.io/repository/npm-internal/
ARG NPM_TOKEN

ENV FIPS_ENABLED=false

WORKDIR /usr/src/app

USER root

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY . .

RUN npm config set @mulesoft:registry=https://$MULE_NPM_REGISTRY \
    && npm config set //$MULE_NPM_REGISTRY:_authToken=$NPM_TOKEN \
    && chown -R app:app . \
    && npm ci

USER app
ARG GIT_BRANCH
ARG GH_TOKEN
ARG SECRET_KEY
RUN npx gulp release
