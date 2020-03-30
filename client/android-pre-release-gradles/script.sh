#!/bin/bash

# This script copies all files inside each package and copies to node_modules
# each package contains (for now 30/3/20) a single build.gradle file which is fixed
# to pass android release

# Error handling
set -eu -o pipefail
function print_error {
    read line file <<<$(caller)
    echo "An error occurred in line $line of file $file:" >&2
    sed "${line}q;d" "$file" >&2
}
trap print_error ERR

# Enable aliases
shopt -s expand_aliases

### **** ACTUAL SCRIPT START ****
for PACKAGE in */; do
  echo "Handling package $PACKAGE"
  # Copy to proper location in node_modules
  cp -vu ${PACKAGE}* ../node_modules/${PACKAGE}android
done

echo "All packages repaired!"