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
                        # instalo curl
                        apk add --no-cache curl
                        
                        # descargo kubectl
                        curl -LO "https://dl.k8s.io/release/\$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

                        chmod +x kubectl
                        
                        # doy permisos de ejecucion y los muevo a usr/local/bin para que este en el path
                        mv kubectl /usr/local/bin/

                        # --- REINICIO ---
                        # con esto fuerzo el reinicio del pod   
                        kubectl rollout restart deployment/portfolio-ismael-miportfolio --namespace portfolio-namespace
                    """
                }
            }
        }
    }
}