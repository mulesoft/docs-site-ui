FROM artifacts.msap.io/mulesoft/core-paas-base-image-node-16:v4.7.26 as BUILD

ENV FIPS_ENABLED=false

WORKDIR /usr/src/app

USER root

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install Git
# hadolint ignore=DL3008
RUN apt-get update \
  && apt-get install -y --no-install-recommends git \
  && rm -rf /var/lib/apt/lists/*

COPY . .

RUN chown -R app:app . \
    && npm ci

USER app

# need this token in the gulp commands to create releases and PRs
ARG SECRET_KEY
ARG GH_TOKEN
RUN npx gulp release