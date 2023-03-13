FROM artifacts.msap.io/mulesoft/dev-docs-images-node-gpg:v1.0.0

WORKDIR /app

USER root
COPY . .

RUN chown -R app:app . \
    && npm ci

USER app

# need this token in the gulp commands to create releases and PRs
ARG GH_TOKEN
RUN npx gulp release