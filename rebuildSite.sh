#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd $SCRIPT_DIR

git fetch
git reset --hard origin/main
git pull

pnpm install --force

cd "$SCRIPT_DIR/hci-backend"

pnpm install --force
pnpm run build --emptyOutDir

sudo service hci restart
