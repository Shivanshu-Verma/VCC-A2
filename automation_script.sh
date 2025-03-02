#!/bin/bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Pull and run the Docker image from Docker Hub
sudo docker run -d -p 80:5000 shivanshu010/fibonacci:latest