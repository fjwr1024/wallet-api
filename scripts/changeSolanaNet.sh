#!/bin/bash
set -eux

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
npx solana-suite-config -c ${SOLANA_CLUSTER}
