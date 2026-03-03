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
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker
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
                        --destination iferlop/portfolio_app:${env.GIT_COMMIT} \
                        --destination iferlop/portfolio_app:latest \
                        --snapshot-mode=redo \
                        --single-snapshot
                    """
                }
            }
        }
    // stage('Create ArgoCD Repo Secreto') {
    //   steps {
    //     withCredentials([usernamePassword(
    //       credentialsId: '493c2a96-7449-446a-bc47-ece0e330cf16',
    //       usernameVariable: 'GIT_USER',
    //       passwordVariable: 'GIT_PASSWORD'
    //     )])
    //      {
    //       sh """
    //       kubectl create secret generic repo-secret-cred \
    //         --namespace argocd \
    //         --from-literal=type=git \
    //         --from-literal=url=https://github.com/morgadodesarrollador/portfolioHelm.git \
    //         --from-literal=username=$GIT_USER \
    //         --from-literal=password=$GIT_PASSWORD \
    //         --dry-run=client -o yaml | kubectl apply -f -
    //       """
    //     }
    //   }
    // }

    }
}