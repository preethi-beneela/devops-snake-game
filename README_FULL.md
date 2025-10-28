DevOps Mini Game - Snake Neon Edition (Full)

This project contains:
- Neon-themed Snake Game (public/)
- Node.js backend (src/)
- Tests (tests/)
- Dockerfile
- GitHub Actions workflow to build, test, push, and deploy to Azure ACR & AKS
- Terraform to provision Resource Group, ACR, and AKS
- Kubernetes manifests (k8s/)
- Ansible playbook (ansible/)

Quick local run:
1. npm install
2. npm test
3. npm start  (open http://localhost:3000)

Docker local run:
docker build -t snake-game .
docker run -p 3000:3000 snake-game

Terraform (creates cloud resources - may cost money):
cd terraform
terraform init
terraform apply -auto-approve

Clean up:
terraform destroy -auto-approve