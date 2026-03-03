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

                        # 1. Aseguramos que el secreto del repo existe
                        kubectl create secret generic repo-secret-cred \
                            --namespace argocd \
                            --from-literal=type=git \
                            --from-literal=url=https://github.com/vixtinity/portfolioreact.git \
                            --dry-run=client -o yaml | kubectl apply -f -

                        # 2. ACTUALIZACIÓN REAL: Forzamos al Deployment a usar la nueva imagen
                        # SUSTITUYE 'portfolio-react' por el nombre de tu Deployment
                        # SUSTITUYE 'default' por el namespace donde corre tu App
                        kubectl set image deployment/portfolio-react portfolio-react=iferlop/portfolio_app:${env.GIT_COMMIT} --namespace default
                        
                        # 3. Forzar el refresco por si usas el tag 'latest'
                        kubectl rollout restart deployment/portfolio-react --namespace default
                    """
                }
            }
        }
    }
}