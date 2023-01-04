#!/bin/bash

# healthcheckの負荷テスト実行スクリプト

set -eux
source ./k6/scripts/healthcheck.sh
k6 run -u 180 -d 10s --rps 180 healthcheck.js
