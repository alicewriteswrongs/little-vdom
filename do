#!/bin/bash

function fmt {
    yarn prettier --no-semi --write src/**/*.ts src/*.ts
}

function ts:watch {
    yarn tsc --noEmit --watch
}

function start {
    yarn parcel src/index.html
}

"$@"
