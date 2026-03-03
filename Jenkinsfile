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
  - name: kubectl
    image: bitnami/kubectl:latest
    # Forzamos a que el contenedor se mantenga durmiendo para que Jenkins lo use
    command: ["/bin/sh", "-c"]
    args: ["while true; do sleep 30; done;"]
    tty: true
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

    environment {
        IMAGE = "iferlop/portfolio_app:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
                container('kubectl') {
                    sh """
                        kubectl create secret generic repo-secret-cred \
                            --namespace argocd \
                            --from-literal=type=git \
                            --from-literal=url=https://github.com/vixtinity/portfolioreact.git \
                            --dry-run=client -o yaml | kubectl apply -f -
                    """
                }
            }
        }
    }
}