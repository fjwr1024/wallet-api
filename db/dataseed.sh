#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
echo ${SCRIPT_DIR}

DB_NAME="wallet_db"
CONFIG_FILE="$SCRIPT_DIR/dbaccess.cnf"

SQL_FILE1="$SCRIPT_DIR/seed/products_insert.sql"

mysql --defaults-extra-file=$CONFIG_FILE $DB_NAME <$SQL_FILE1

# SQL_FILES_DIR="$SCRIPT_DIR/seed"
# echo "SQL_FILES_DIR: $SQL_FILES_DIR"
# for SQL_FILE in "$SQL_FILES_DIR"/*.sql; do
#   echo "Executing $SQL_FILE ..."
#   mysql --defaults-extra-file=$CONFIG_FILE $DB_NAME < $SQL_FILE
# done

echo "Data seeded successfully."
