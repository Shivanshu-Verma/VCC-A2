# Fibonacci Project

This project consists of three main components: backend, frontend, and an automation script. The entire project is designed for setting up a virtual machine (VM) in Google Cloud Platform (GCP) that leverages auto-scaling policies and enhanced security measures. The solution includes creating a backend application to generate CPU load, containerizing the application using Docker, and deploying it via an instance template and managed instance group.

## Backend Setup

### Building the Backend Docker Image

1. **Navigate to the Backend Directory**:

   ```bash
   cd /path/to/VCC-A2/backend
   ```

2. **Build the Docker Image**:

   ```bash
   docker build -t fibonacci-api .
   ```

3. **Tag the Docker Image**:

   ```bash
   docker tag fibonacci-api:latest your-dockerhub-username/fibonacci-api:latest
   ```

4. **Push the Docker Image to Docker Hub**:
   ```bash
   docker push your-dockerhub-username/fibonacci-api:latest
   ```

## Automation Script

The automation script is designed to be executed on each VM. It performs the following tasks:

1. **Update the Package List**:

   ```bash
   sudo apt update
   ```

2. **Install Docker**:

   ```bash
   sudo apt install -y docker.io
   ```

3. **Start and Enable Docker Service**:

   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

4. **Pull and Run the Docker Image**:
   ```bash
   sudo docker run -d -p 80:5000 your-dockerhub-username/fibonacci-api:latest
   ```

This script ensures that Docker is installed, started, and enabled on each VM, and then pulls and runs the Docker image from Docker Hub.

## Frontend Setup (Optional)

The frontend provides a graphical user interface (GUI) web application for clients to communicate with the server. It is built using React and TypeScript, and containerized using Docker.

### Building and Running the Frontend

1. **Navigate to the Frontend Directory**:

   ```bash
   cd /path/to/VCC-A2/frontend
   ```

2. **Build the Docker Image**:

   ```bash
   docker build -t fibonacci-frontend .
   ```

3. **Run the Docker Container**:
   ```bash
   docker run -p 3000:80 fibonacci-frontend
   ```

This will start the frontend application, making it accessible on port 3000.

---

By following these steps, you can set up the backend and frontend components, and automate the deployment process on GCP VMs using the provided script.
