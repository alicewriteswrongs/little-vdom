#!/bin/bash

function fmt {
    yarn prettier --no-semi --write src/**/*.ts src/*.ts
}

"$@"
