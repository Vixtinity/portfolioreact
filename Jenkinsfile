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
                    git config --global --add safe.directory \$(pwd)
                    git checkout main || git checkout -b main
                    git config user.email "jenkins@example.com"
                    git config user.name "Jenkins CI"

                    # EDITAMOS EL VALUES.YAML DE HELM
                    # Esto busca la línea 'tag:' y le pone el nuevo hash
                    sed -i 's|tag:.*|tag: "${env.GIT_COMMIT}"|' deploy/miportfolio/values.yaml

                    git add deploy/miportfolio/values.yaml
                    git commit -m "chore: update helm tag to ${env.GIT_COMMIT} [skip ci]"
                    git push https://${GIT_USER}:${GIT_PASS}@github.com/Vixtinity/portfolioreact.git main
                """
            }
        }
    }
}
    }
}