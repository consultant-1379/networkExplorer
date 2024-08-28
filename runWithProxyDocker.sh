#!/bin/bash
######################################
# READ ME FIRST
#  Update your hosts file with the following entry
#  to enable your desktop -> docker proxy:
#
#    127.0.0.1       netex_jboss
#
#  The hostname should match the service container
#  name created from the docker-compose file.
######################################
ADDITIONAL_MODULES+=('../docker-external-services.js')
EXTRA_CDT_SERVE_PARAMS+=('--proxy-config')
EXTRA_CDT_SERVE_PARAMS+=('../docker-proxy-config.json')
. runWithX.sh