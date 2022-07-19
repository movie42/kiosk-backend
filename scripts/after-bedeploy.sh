#!/bin/bash

cp -rf /home/ubuntu/deploy/server/* /home/ubuntu/server/ && rm -rf /home/ubuntu/deploy/server/
sudo pm2 reload all

echo "> Pm2 reload"