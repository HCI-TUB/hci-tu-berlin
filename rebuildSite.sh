#!/bin/zsh

SCRIPT_DIR=${0:a:h}

source ~/.zshrc

cd $SCRIPT_DIR

git fetch
git reset --hard origin/main
git pull

# pnpm install --force

cd "$SCRIPT_DIR/backend"

pnpm install --force

cd "$SCRIPT_DIR/frontend"

pnpm install --force
pnpm run build --emptyOutDir

sudo service hci restart
