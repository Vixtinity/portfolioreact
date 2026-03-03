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
  - name: tools
    image: alpine:3.18
    command: ["/bin/sh", "-c"]
    args: ["cat"]
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

        stage('Update and Refresh ArgoCD') {
            steps {
                container('tools') {
                    sh """
                        apk add --no-cache curl
                        curl -LO "https://dl.k8s.io/release/\$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                        chmod +x kubectl
                        mv kubectl /usr/local/bin/

                        # 1. Crear/Actualizar secreto de ArgoCD
                        kubectl create secret generic repo-secret-cred \
                            --namespace argocd \
                            --from-literal=type=git \
                            --from-literal=url=https://github.com/vixtinity/portfolioreact.git \
                            --dry-run=client -o yaml | kubectl apply -f -

                        # 2. Actualizar la imagen del Deployment de Ismael
                        # Usamos el nombre exacto que sacamos de tu consola
                        kubectl set image deployment/portfolio-ismael-miportfolio portfolio-ismael-miportfolio=iferlop/portfolio_app:${env.GIT_COMMIT} --namespace portfolio-namespace
                        
                        # 3. Forzar el reinicio para asegurar que pilla la nueva imagen
                        kubectl rollout restart deployment/portfolio-ismael-miportfolio --namespace portfolio-namespace
                    """
                }
            }
        }
    }
}