#!/bin/bash

##############################
# Install UISDK dependencies #
##############################

function installdeps {
  if [ -d "$1" ]; then
    cd $1
    cdt2 package install --autofill
    cd ..
  fi
}
installdeps collectionmanagement
installdeps savedsearchmanagement
installdeps networkexplorer

#######################
# Link local packages #
#######################

function linklib {
  if [ -d "$1" ]; then
    cd networkexplorer
    cdt2 package link ../$1
    cd ..
  fi
}
linklib ../../../collection-management/collectionmanagement
linklib ../../../saved-search-management/savedsearchmanagement
linklib networkexplorer/test/resources/ActionApp
cd ../../../