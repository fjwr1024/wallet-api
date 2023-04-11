#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
echo ${SCRIPT_DIR}

DB_NAME="wallet_db"
CONFIG_FILE="$SCRIPT_DIR/dbaccess.cnf"

SQL_FILE1="$SCRIPT_DIR/seed/products_insert.sql"

mysql --defaults-extra-file=$CONFIG_FILE $DB_NAME <$SQL_FILE1

echo "Data seeded successfully."
