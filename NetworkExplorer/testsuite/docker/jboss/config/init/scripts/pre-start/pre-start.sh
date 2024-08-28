#! /bin/bash

# This script is executed before JBoss, so it can be used to configure the environment.
#--------------------------------------------------------------------------------------

# Load the common functions
source docker-env-functions.sh

# Install the RPMs from rpms folder, and the txt files in iso and nexus folders
install_rpms_from_nexus
install_rpms_from_iso

# Makes JBoss wait for DPS Integration image to be ready
wait_dps_integration
