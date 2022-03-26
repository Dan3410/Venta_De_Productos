#!/bin/bash

sudo service mongod start

echo Installing necessary packages for BackEnd
cd BackEnd && npm install
cd ..

echo

echo Installing necessary packages for FrontEnd 
cd FrontEnd && npm install
cd ..

cd BackEnd && npm start




