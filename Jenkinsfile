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
  - name: kubectl-tool
    image: bitnami/kubectl:latest
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
                        --destination ${IMAGE} \
                        --snapshot-mode=redo
                    """
                }
            }
        }

        stage('Force Deployment Update') {
            steps {
                container('kubectl-tool') {
                    // Esto fuerza a los Pods a refrescarse con la nueva imagen :latest
                    sh "kubectl rollout restart deployment portfolio-ismael-miportfolio -n portfolio-namespace"
                }
            }
        }
    }
}