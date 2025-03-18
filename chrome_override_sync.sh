#!/bin/sh

fswatch -o ./public/index.html | while read f; do
    rsync ./public/index.html ~/browser_overrides/docs.mulesoft.com/general/index.html
done
