#!/bin/bash
set -eux

SCRIPT_DIR=$(
    cd $(dirname $0)
    pwd
)
SQL_DIR="$SCRIPT_DIR/../src/db/seed"
cd $SQL_DIR

if [ -d "$SQL_DIR" ]; then
    source $SQL_DIR/products_insert.sql
    echo "Directory contents have been deleted successfully."
else
    echo "Directory does not exist."
fi
