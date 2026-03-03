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
                        
                        # doy permisos de ejecucion y los muevo a usr/local/bin para que este en el path
                        mv kubectl /usr/local/bin/

                        # --- PASO 1: Gestión de credenciales en ArgoCD ---
                        # Creamos un secreto con la URL de tu repo de GitHub. 
                        # El '--dry-run=client -o yaml | kubectl apply' sirve para que, si el secreto ya existe, 
                        # simplemente lo actualice en lugar de dar error.
                        kubectl create secret generic repo-secret-cred \
                            --namespace argocd \
                            --from-literal=type=git \
                            --from-literal=url=https://github.com/vixtinity/portfolioreact.git \
                            --dry-run=client -o yaml | kubectl apply -f -

                        # --- ACTUALIZO LA IMAGEN ---
                        # Este es el comando clave. Le dice al Deployment: 
                        # busca el contenedor miportfolio (kubectl get deployment portfolio-ismael-miportfolio -n portfolio-namespace -o jsonpath='{.spec.template.spec.containers[0].name}')
                        # y cambia la imagen por la nueva.
                        # Usamos '${env.GIT_COMMIT}' para que la imagen sea única y Kubernetes detecte el cambio.
                        kubectl set image deployment/portfolio-ismael-miportfolio miportfolio=iferlop/portfolio_app:${env.GIT_COMMIT} --namespace portfolio-namespace
                        
                        # --- REINICIO ---
                        # con esto fuerzo el reinicio del pod   
                        kubectl rollout restart deployment/portfolio-ismael-miportfolio --namespace portfolio-namespace
                    """
                }
            }
        }
    }
}