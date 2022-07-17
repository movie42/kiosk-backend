#!/bin/bash

if [ -d /home/ubuntu/serverdev/ ]; then
    rm -rf /home/ubuntu/serverdev/
fi
mkdir -vp /home/ubuntu/serverdev/
cp /home/ubuntu/ormjson/dev/ormconfig.json /home/ubuntu/serverdev/

echo "> location serverdev file delete"