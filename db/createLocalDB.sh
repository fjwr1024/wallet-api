#!/bin/bash
set -eux

# cnfファイルの内容は適宜変更してください
DB_ACCESS_FILE="./db/dbaccess.cnf"

NEW_DATABASE="wallet_db"

mysql --defaults-extra-file=$DB_ACCESS_FILE -e "CREATE DATABASE IF NOT EXISTS $NEW_DATABASE;"

echo "データベースが作成されました: $NEW_DATABASE"
