#!/bin/bash

cd /home/ubuntu/webpage/

git fetch
git reset --hard origin/main
git pull

pnpm install --force

cd /home/ubuntu/webpage/hci-tu-berlin

pnpm install --force
pnpm run build --emptyOutDir

sudo service hci restart
