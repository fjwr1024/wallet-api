#!/bin/bash
set -eux

SCRIPT_DIR=$(
  cd $(dirname $0)
  pwd
)
SOLANA_DIR="$SCRIPT_DIR/../node_modules/@solana-suite/shared"
cd $SOLANA_DIR

echo $PROJECT_ID
if [ "$PROJECT_ID" = "wallet-api-dev" ]; then
  SOLANA_CLUSTER="dev"
  SOLANA_DEBUG="on"
elif [ "$PROJECT_ID" = "wallet-api-prd" ]; then
  SOLANA_CLUSTER="prd"
  SOLANA_DEBUG="on"
else
  echo "unknown project id"
  exit 1
fi

# command
./solana-suite-config.js -c ${SOLANA_CLUSTER}
