#!/bin/bash

cd /node_apps/hci-tu-berlin/

git fetch
git reset --hard origin/main
git pull

pnpm install --force

cd /node_apps/hci-tu-berlin/hci-tu-berlin

pnpm install --force
pnpm run build --emptyOutDir

service hci restart
