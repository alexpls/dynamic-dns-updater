#!/bin/bash

while true; do
  node main.js;
  echo "Sleeping for $UPDATE_FREQUENCY_SECONDS seconds...";
  sleep $UPDATE_FREQUENCY_SECONDS;
done;
