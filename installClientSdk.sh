#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ -z "$1" ]; then
    printf "Usage: installClientSdk.sh <version>\n e.g. installClientSdk.sh 1.14.0"
    exit
fi
for arg in networkexplorer
do
  echo "Installing in $arg..."
  cd ${SCRIPT_DIR}/NetworkExplorer/$arg/
  cdt2 package install clientsdk@$1
done
