#!/bin/bash
set -eux

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
echo ${SCRIPT_DIR}

"${SCRIPT_DIR}/createLocalDB.sh"
"${SCRIPT_DIR}/../scripts/migration.sh"
"${SCRIPT_DIR}/dataseed.sh"

echo "All Scripts Executed Successfully."
