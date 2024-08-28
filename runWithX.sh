#!/bin/bash
#
# USAGE:
#   First parameter sets a specific port to serve on
#   e.g. <scriptname> 8787
#
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PORT=8585
if [ ! -z "$1" ]; then
    PORT=$1
fi
cd ${SCRIPT_DIR}/NetworkExplorer/networkexplorer
MODULES=()
# Any other modules
if [ ! -z "$ADDITIONAL_MODULES" ]; then
    MODULES+=( "${ADDITIONAL_MODULES[@]}" )
fi
PARAMS=()
# Any other parameters for cdt serve
if [ ! -z "EXTRA_CDT_SERVE_PARAMS" ]; then
    PARAMS+=( "${EXTRA_CDT_SERVE_PARAMS[@]}" )
fi
MODULE_LIST=$(IFS=, ; echo "${MODULES[*]}")
PARAM_LIST=$(echo "${PARAMS[*]}")
cdt2 serve -m $MODULE_LIST -p $PORT $PARAM_LIST