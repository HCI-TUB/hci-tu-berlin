#!/bin/bash

cd /home/ubuntu/webpage/

git fetch
git reset --hard origin/main
git pull

/home/ubuntu/.local/share/pnpm/pnpm install --force

cd /home/ubuntu/webpage/hci-tu-berlin

/home/ubuntu/.local/share/pnpm/pnpm install --force
/home/ubuntu/.local/share/pnpm/pnpm run build --emptyOutDir

sudo service hci restart
