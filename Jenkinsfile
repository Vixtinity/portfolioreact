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
    image: alpine/git
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
        // Necesitas definir esto para que el stage de Update funcione
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
                        git config --global --add safe.directory \$(pwd)
                        git config --global user.email "08062006ismael@gmail.com"
                        git config --global user.name "Jenkins-Bot"

                        git checkout main || git checkout -b main

                        sed -i 's/tag: .*/tag: "${SHORT_SHA}"/' deploy/miportfolio/values.yaml

                        git add deploy/miportfolio/values.yaml
                        git commit -m "chore: update image tag to ${SHORT_SHA} [skip ci]"

                        # Si el checkout inicial fue por HTTPS con credenciales, 
                        # el push debería heredar la sesión.
                        git push origin main
                    """
                }
            }
        }
    }
}