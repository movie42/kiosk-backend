#!/bin/bash

mkdir -vp /home/ubuntu/deploy/client/
mkdir -vp /home/ubuntu/deploy/server/
cp -rf /home/ubuntu/ormjson/prod/ormconfig.json /home/ubuntu/server

echo "> location server file delete"