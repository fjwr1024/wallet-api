#!/bin/bash
set -eux

SCRIPT_DIR=$(
    cd $(dirname $0)
    pwd
)
SOLANA_DIR="$SCRIPT_DIR/../node_modules/@solana-suite/shared"
cd $SOLANA_DIR

echo ${SOLANA_DIR}

# command
./solana-suite-config.js -d true
