#!/bin/sh

function build_project() {
  rm -r ./dist
  echo "Building"
  npm run build
  cp ./src/sw.js ./dist/assets
}

build_project
