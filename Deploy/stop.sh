#!/bin/bash

fuser -k -n tcp 8443
fuser -k -n tcp 8444
fuser -k -n tcp 8445
