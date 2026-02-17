pipeline{
    agent any
    stages{
        stage('Checkout3'){
            steps{
                git branch: 'main', credentialsId: 'porfoli', url: 'https://github.com/josu-dev/josu-dev.com.git'
            }
        }
        stage('info'){
            steps{
                sh 'git rev.parsea --short head'
            }
        }
    }
}

//porfo-docker