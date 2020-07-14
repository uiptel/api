#!/bin/sh

kubectl port-forward  --address 0.0.0.0 service/mysql 3306
