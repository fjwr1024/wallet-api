#!/bin/bash
set -eux

yarn migration:generate
yarn migration:run

SCRIPT_DIR=$(
    cd $(dirname $0)
    pwd
)

DIR_PATH="$SCRIPT_DIR/../src/migration/"

# directry exists confirm
if [ -d "$DIR_PATH" ]; then
    rm -r $DIR_PATH/*
    echo "Directory contents have been deleted successfully."
else
    echo "Directory does not exist."
fi
