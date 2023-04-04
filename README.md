# CMPT474 - Co-op Learning Platform

## Description

All POST request body has to be encoded in JSON.

Services are currently deployed on Cloud Run. We push a docker image to the Container Register.

## Commands

* To Build Locally and Run:
    * `./commands.sh --build/run`
* Kill Docker Container (WORK IN PROGRESS):
    * `./commands.sh --kill`
* Deploy to Google Cloud:
    * `./commands.sh --deploy`