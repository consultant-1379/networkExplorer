#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PORT=8585
if [ ! -z "$1" ]; then
    PORT=$1
fi
cdt2 serve -m restMock.js -p $PORT
