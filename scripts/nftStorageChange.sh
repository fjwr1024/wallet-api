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
./solana-suite-config.js -n eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzNzQ0MDRkOUEwYWQyRUNEQjAyNTFCMWY4MjYyMzFENDdCNmVjNjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Mjk0OTIwODIzMCwibmFtZSI6IndhbGxldF9hcGkifQ._JItDrNriRqiCGWA86nptTR0xBfGXUpyQA99NUS9Tjs
