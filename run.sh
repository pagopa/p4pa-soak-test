#!/bin/sh

# Execute a single test on target environment.
#
# Usage: ./run.sh (DEV|UAT) src/tests/testFile.js
# See README file for environment variables settings

export RESULTS_DIR=$RESULTS_DIR || $(dirname $0)

if [[ -z "$RESULTS_DIR" ]]; then
  export RESULTS_DIR=.
fi


if [[ -z "$K6_BINARY" ]]; then
  K6_BINARY="k6"
fi

set -e

export TARGET_ENV=$1
TEST_FILE=$2

if [[ -z "$TARGET_ENV" || ! $(echo $TARGET_ENV | grep  -E "^(DEV|UAT)$") || -z "$TEST_FILE" ]]; then
  echo "Usage: ./run.sh <DEV|UAT> src/tests/testFile.js"
  exit 0
fi

echo "Running $TEST_FILE"

echo mkdir -p $RESULTS_DIR/results/$(dirname $(echo $TEST_FILE | sed -e 's/^.*src\/tests\///'))
mkdir -p $RESULTS_DIR/results/$(dirname $(echo $TEST_FILE | sed -e 's/^.*src\/tests\///'))

$K6_BINARY run $TEST_FILE