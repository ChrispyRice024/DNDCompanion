#!/bin/bash

# Run Vite build command
vite build

# Define the NW.js package.json content
read -r -d '' NW_PACKAGE_JSON << EOM
{
  "name": "my-nwjs-app",
  "main": "../public/index.html",
  "version": "1.0.0",
  "window": {
    "title": "My NW.js App",
    "width": 800,
    "height": 600
  }
}
EOM

# Create the dist directory if it doesn't exist
mkdir -p dist

# Write the NW.js package.json file to the dist directory
echo "$NW_PACKAGE_JSON" > dist/package.json

echo "NW.js package.json has been created in the dist directory."
