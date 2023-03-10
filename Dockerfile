FROM artifacts.msap.io/mulesoft/dev-docs-images-node-gpg:latest

ARG GH_TOKEN
# ARG GPG_PRIVATE_KEY

WORKDIR /app

USER root
COPY . .

RUN chown -R app:app . \
    && npm install

USER app
RUN npx gulp release