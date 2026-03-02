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
    image: alpine/git # Contenedor ligero para actualizar el values.yaml
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

    environment {
        // Generamos un tag corto basado en el commit de Git
        SHORT_SHA = "${env.GIT_COMMIT.take(7)}"
        IMAGE_REPO = "iferlop/portfolio_app"
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
                        --destination ${IMAGE_REPO}:${SHORT_SHA} \
                        --destination ${IMAGE_REPO}:latest \
                        --snapshot-mode=redo
                    """
                }
            }
        }

        stage('Update Manifests') {
            steps {
                container('git-tool') {
                    sh """
                        # Modificar el values.yaml con el nuevo tag
                        # Buscamos la línea 'tag: "latest"' y la reemplazamos
                        sed -i 's/tag: .*/tag: "${SHORT_SHA}"/' deploy/miportfolio/values.yaml
                        
                        # Subir el cambio al repo
                        git add deploy/miportfolio/values.yaml
                        git commit -m "chore: update image tag to ${SHORT_SHA} [skip ci]"
                        
                        # Nota: Asegúrate de que el Jenkins tenga permisos de escritura en el repo
                        git push origin main
                    """
                }
            }
        }
    }
}