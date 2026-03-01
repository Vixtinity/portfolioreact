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
                            # 1. Forzar que estamos en el directorio de trabajo
                            git config --global --add safe.directory \$(pwd)
                            
                            # 2. Configurar identidad
                            git config user.email "jenkins@example.com"
                            git config user.name "Jenkins CI"

                            # 3. Modificar el YAML (Asegúrate de que la ruta 'deploy/tu-archivo.yaml' sea correcta)
                            # Usamos la variable GIT_COMMIT que Kaniko ya usó
                            sed -i 's|image: iferlop/portfolio_app:.*|image: iferlop/portfolio_app:${env.GIT_COMMIT}|' deploy/deploy_portfolio.yaml

                            # 4. Commit de los cambios
                            git add deploy/tu-archivo.yaml
                            git commit -m "chore: update image to ${env.GIT_COMMIT} [skip ci]"

                            # 5. Push usando el Token (esto es lo que ArgoCD detectará)
                            # IMPORTANTE: Cambia 'github.com/tu-usuario/tu-repo.git' por tu URL real
                            git push https://${GIT_USER}:${GIT_PASS}@github.com/iferlop/tu-repo-name.git HEAD:main
                        """
                    }
                }
            }
        }
    }
}