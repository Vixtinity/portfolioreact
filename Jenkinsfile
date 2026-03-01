pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: 
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
  - name: git-tool
    image: alpine/git # Contenedor ligero con Git
    command: ["/bin/sh", "-c", "cat"]
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

stage('Update ArgoCD Manifest') {
    steps {
        container('git-tool') {
            withCredentials([usernamePassword(credentialsId: 'github-creds', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                sh """
                    # 1. Configuración de Git y Seguridad
                    git config --global --add safe.directory \$(pwd)
                    git config user.email "jenkins@example.com"
                    git config user.name "Jenkins CI"

                    # 2. SALIR DEL MODO DETACHED (Ir a main)
                    git checkout main || git checkout -b main

                    # 3. EL SED CORREGIDO (Usando portfolioreact que es el nombre real en tu YAML)
                    sed -i 's|image: iferlop/portfolioreact:.*|image: iferlop/portfolioreact:${env.GIT_COMMIT}|' deploy/kubernetes/deploy_portfolio.yaml

                    # 4. VERIFICACIÓN (Si esto sale bien, verás el hash en la consola)
                    echo "--- Verificando cambio en el YAML ---"
                    grep "image:" deploy/kubernetes/deploy_portfolio.yaml
                    echo "------------------------------------"

                    # 5. COMMIT Y PUSH
                    git add deploy/kubernetes/deploy_portfolio.yaml
                    git commit -m "chore: update image to ${env.GIT_COMMIT} [skip ci]"
                    
                    # Asegúrate de que el nombre del repo sea PORTFOLIOREACT
                    git push https://${GIT_USER}:${GIT_PASS}@github.com/iferlop/PORTFOLIOREACT.git main
                """
            }
        }
    }
}
    }
}