# 🚀 CI/CD Pipeline for Flask & Express Applications using Jenkins

## 📌 Project Overview

This project demonstrates a complete Continuous Integration and Continuous Deployment (CI/CD) pipeline using **Jenkins**. It automates the deployment of both a **Flask Backend** and an **Express.js Frontend** hosted on an AWS EC2 instance.

Whenever code is pushed to the GitHub repository, Jenkins automatically pulls the latest code, installs dependencies, and deploys the applications using **PM2**..

---

# 🏗️ Architecture

```
                   +----------------------+
                   |      GitHub Repo     |
                   +----------+-----------+
                              |
                       Git Push / Commit
                              |
                    GitHub Webhook Trigger
                              |
                              ▼
                    +-------------------+
                    |      Jenkins      |
                    +-------------------+
                      |               |
          Backend Pipeline      Frontend Pipeline
                      |               |
              Git Checkout      Git Checkout
                      |               |
             Install Python      Install Node
              Dependencies      Dependencies
                      |               |
              Restart PM2       Restart PM2
                      |               |
                      +-------+-------+
                              |
                              ▼
                      AWS EC2 Instance
```

---

# 📁 Project Structure

```
meditation-app/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Dockerfile
│
├── frontend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│
├── docker-compose.yml
├── README.md
```

---

# 🛠️ Technologies Used

- Jenkins
- Git
- GitHub
- GitHub Webhooks
- Python 3
- Flask
- Flask-CORS
- Node.js
- Express.js
- PM2
- AWS EC2
- Ubuntu Linux

---

# ⚙️ Prerequisites

Before running the project, install:

- Git
- Jenkins
- Python 3
- pip
- Node.js
- npm
- PM2

Example:

```bash
sudo apt update

sudo apt install git python3 python3-pip python3-venv -y

sudo apt install nodejs npm -y

sudo npm install -g pm2
```

---

# Jenkins Installation

```bash
sudo apt update

sudo apt install fontconfig openjdk-21-jre -y

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install jenkins -y

sudo systemctl enable jenkins

sudo systemctl start jenkins
```

---

# Jenkins Plugins

Install the following plugins:

- Git
- Pipeline
- Pipeline: Stage View
- Credentials Binding
- NodeJS

---

# Backend Pipeline

Pipeline stages:

- Checkout Code
- Install Python Dependencies
- Restart Flask Application using PM2

Backend Commands:

```bash
python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

pm2 restart meditation-backend || pm2 start "venv/bin/python app.py" --name meditation-backend

pm2 save
```

---

# Frontend Pipeline

Pipeline stages:

- Checkout Code
- Install Node Dependencies
- Restart Express Application using PM2

Commands:

```bash
npm install

pm2 restart meditation-frontend || pm2 start server.js --name meditation-frontend

pm2 save
```

---

# GitHub Webhook

Configure GitHub Webhook:

Repository

```
Settings
    ↓
Webhooks
    ↓
Add Webhook
```

Payload URL

```
http://<EC2-Public-IP>:8080/github-webhook/
```

Content Type

```
application/json
```

Events

```
Just the push event
```

---

# CI/CD Workflow

```
Developer Pushes Code
          │
          ▼
GitHub Repository
          │
          ▼
GitHub Webhook
          │
          ▼
Jenkins Pipeline
          │
          ├── Checkout Code
          ├── Install Dependencies
          ├── Restart Backend
          └── Restart Frontend
          │
          ▼
Application Updated Automatically
```

---

# Running the Applications

Backend

```bash
pm2 start "venv/bin/python app.py" --name meditation-backend
```

Frontend

```bash
pm2 start server.js --name meditation-frontend
```

Check PM2 Status

```bash
pm2 list
```

View Logs

```bash
pm2 logs
```

---

# Useful Jenkins Commands

Restart Jenkins

```bash
sudo systemctl restart jenkins
```

Check Status

```bash
sudo systemctl status jenkins
```

View Logs

```bash
sudo journalctl -u jenkins -f
```

---

# Common Issues Resolved

- Jenkins workspace permission issues
- Git repository checkout issues
- PM2 process management
- Python virtual environment setup
- Jenkins Out Of Memory (OOM) issue
- Disk space management
- Jenkins service recovery
- GitHub Webhook configuration
- Automatic deployment after Git push

---

# Future Enhancements

- Dockerize the applications
- Push Docker images to Docker Hub
- Deploy using Docker Compose
- Kubernetes deployment
- SonarQube integration
- Unit Testing
- Email Notifications
- Slack Notifications

---

# Author

**Navneet Singh Rana**

DevOps Engineer

GitHub:
https://github.com/rana1922

---

# ⭐ Project Outcome

✔ Automated deployment using Jenkins

✔ GitHub Webhook Integration

✔ Flask Backend CI/CD

✔ Express Frontend CI/CD

✔ PM2 Process Management

✔ End-to-End Continuous Deployment on AWS EC2