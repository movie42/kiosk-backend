#!/bin/bash

if [ -d /home/ubuntu/server/ ]; then
    rm -rf /home/ubuntu/server/
fi
mkdir -vp /home/ubuntu/server/
cp /home/ubuntu/ormjson/prod/ormconfig.json /home/ubuntu/server/

echo "> location serverdev file delete and makdir and cp jsonfile"