#!/usr/bin/env bash
scriptname=`basename "$0"`
echo "[$scriptname] Setup UI"

#============================================================#
# !! Copy our application metadata to NFS volume directly !! #
#============================================================#
NFS_DIR="/ericsson/tor/data/apps/"

echo "[$scriptname] Installing application metadata"
cp -R ./launcher/metadata/networkexplorer ${NFS_DIR}/networkexplorer/
cp -R ../../../collection-management/launcher/metadata/collectionmanagement ${NFS_DIR}/collectionmanagement/

echo "[$scriptname] Installing default locales"
cp -R ./networkexplorer/locales/en-us/networkexplorer/app* ${NFS_DIR}/networkexplorer/locales/en-us/
cp -R ../../../collection-management/collectionmanagement/locales/en-us/collectionmanagement/app* ${NFS_DIR}/collectionmanagement/locales/en-us/

echo "[$scriptname] Running HTTP server"

cd networkexplorer

# cdt2 serve
# - Use proxy to route netex REST requests to docker jboss
# - Route any requests targeting non-netex services to the docker-external-services Express module
exec cdt2 serve --proxy-config ../docker-proxy-config.json -m ../docker-external-services.js