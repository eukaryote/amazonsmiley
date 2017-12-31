#!/usr/bin/env bash

# Build zip using web-ext ('npm install --global web-ext').

IGNORE=(
    *.rst
    *.sh
    *test*
)

[[ -d web-ext-artifacts ]] && find web-ext-artifacts -delete

web-ext build --ignore-files "${IGNORE[@]}"
