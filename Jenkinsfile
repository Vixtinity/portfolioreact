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
                    // Usamos credenciales de Jenkins para poder hacer Push al repo
                    // Debes crear una credencial de tipo 'Username with password' con ID 'github-creds'
                    withCredentials([usernamePassword(credentialsId: 'github-creds', passwordVariable: 'GIT_PASS', usernameVariable: 'GIT_USER')]) {
                        sh """
                            # Configurar usuario de Git
                            git config user.email "jenkins@tu-dominio.com"
                            git config user.name "Jenkins CI"

                            # 1. Modificar el YAML usando sed
                            # Cambia 'deploy/tu-archivo.yaml' por la ruta real de tu archivo de deployment
                            sed -i 's|image: iferlop/portfolioreact:.*|image: iferlop/portfolio_app:${env.GIT_COMMIT}|' deploy/tu-archivo.yaml

                            # 2. Commit y Push
                            git add deploy/tu-archivo.yaml
                            git commit -m "chore: update image tag to ${env.GIT_COMMIT} [skip ci]"
                            
                            # Reemplaza la URL por la de tu repositorio
                            git push https://${GIT_USER}:${GIT_PASS}@github.com/tu-usuario/tu-repo.git HEAD:main
                        """
                    }
                }
            }
        }
    }
}