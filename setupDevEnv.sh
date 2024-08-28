#!/bin/bash
function linklib {
  if [ -d "$1" ]; then
    cdt2 package link $1
  fi
}
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${SCRIPT_DIR}/NetworkExplorer/networkexplorer
git clean -dfX
# Get latest deps
npm list request || npm install request@2.81.0 || echo "Failed to npm install request, continuing anyway"
cdt2 package install --autofill
# Link local development repos
linklib ../../../collection-management/collectionmanagement
linklib ../../../saved-search-management/savedsearchmanagement
linklib ../networkexplorercollections
linklib ../networkexplorersavedsearches
# Link local dependency repos
## Action Library
linklib ../../../applib/actionlibrary
linklib ../../../applib/applib
## Network Explorer Lib
linklib ../../../NetworkExplorerLib/NetworkExplorerLib
## Scoping Panel
linklib ../../../scoping-panel/scopingpanel
# Optional
## Topology Browser
linklib ../../../TopologyBrowser/TopologyBrowser-ui
linklib ../../../TopologyBrowser/networkobjectlib
## AMOS
linklib ../../../amos-ui/shell
## AutoCell
linklib ../../../autocellid-ui/autocellid-commonlib
linklib ../../../autocellid-ui/autocellid-openloop
linklib ../../../autocellid-ui/autocellid-settings
linklib ../../../autocellid-ui/autoidmanagement
linklib ../../../autocellid-ui/autocellid-executions
linklib ../../../autocellid-ui/autocellid-schedules
## SHM
linklib ../../../shmgui/src/shm/
linklib ../../../shmgui/src/importsoftwarepackages/
linklib ../../../shmgui/src/shmbackuphousekeeping/
linklib ../../../shmgui/src/shmbackupinventory/
linklib ../../../shmgui/src/shmcreatebackupjob/
linklib ../../../shmgui/src/shmcreateupgradejob/
linklib ../../../shmgui/src/shmexport/
linklib ../../../shmgui/src/shmhardwareinventory/
linklib ../../../shmgui/src/shmimportedkeyfiles/
linklib ../../../shmgui/src/shmimportlicensekeyfiles/
linklib ../../../shmgui/src/shminstalllicensekeyfiles/
linklib ../../../shmgui/src/shmjobdetails/
linklib ../../../shmgui/src/shmjoblogs/
linklib ../../../shmgui/src/shmlibrary/
linklib ../../../shmgui/src/shmlicenseinventory/
linklib ../../../shmgui/src/shmrestorebackupjob/
linklib ../../../shmgui/src/shmsoftwareinventory/
linklib ../../../shmgui/src/shmsoftwarepackages/
## Local Test
linklib test/resources/InterAppMock
linklib test/resources/ActionApp
# End optional
cd ${SCRIPT_DIR}