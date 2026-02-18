pipeline{
    agent any
    stages{
        stage('Checkout3'){
            steps{
                git branch: 'main', credentialsId: 'porfoli', url: 'https://github.com/Vixtinity/portfolioreact.git'
            }
        }
        stage('info'){
            steps{
                sh 'git rev-parse --short HEAD'
            }
        }
    }
}

//porfo-docker