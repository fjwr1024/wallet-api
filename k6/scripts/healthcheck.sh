#!/bin/bash

# healthcheckの負荷テスト実行スクリプト

set -eux
source ./k6/scripts/user-api/
k6 run -e USER_API_URL=$USER_API_URL \
  ./k6/user-api/tests/healthcheck.js
