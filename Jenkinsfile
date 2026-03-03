pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command: ["/busybox/cat"]
    tty: true
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker
  volumes:
  - name: kaniko-secret
    secret:
      secretName: dockerhub-secret
      items:
      - key: .dockerconfigjson
        path: config.json
"""
        }
    }

    stages {
        stage('Build and Push') {
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor \
                        --context \$(pwd) \
                        --dockerfile deploy/build_img/Dockerfile \
                        --destination iferlop/portfolio_app:${env.GIT_COMMIT} \
                        --destination iferlop/portfolio_app:latest \
                        --snapshot-mode=redo \
                        --single-snapshot
                    """
                }
            }
        }

        stage('Create ArgoCD Repo Secret') {
            steps {
                container('kaniko') {
                    sh """
                        # Descargamos kubectl directamente en el contenedor de kaniko
                        # Usamos la version estable de Linux amd64
                        wget -O kubectl "https://dl.k8s.io/release/\$(wget -qO- https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                        chmod +x kubectl
                        
                        ./kubectl create secret generic repo-secret-cred \
                            --namespace argocd \
                            --from-literal=type=git \
                            --from-literal=url=https://github.com/vixtinity/portfolioreact.git \
                            --dry-run=client -o yaml | ./kubectl apply -f -
                    """
                }
            }
        }
    }
}