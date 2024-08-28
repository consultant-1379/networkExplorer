#!/bin/bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ -z "$2" ]; then
    printf "Usage: installPackage.sh <version>\n e.g. installPackage.sh clientsdk 1.14.0"
    exit
fi
for arg in networkexplorer
do
  echo "Installing $1 in $arg..."
  cd ${SCRIPT_DIR}/NetworkExplorer/$arg/
  cdt2 package install $1@$2
done
