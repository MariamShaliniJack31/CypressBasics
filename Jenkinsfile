pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/MariamShaliniJack31/CypressBasics.git'
            }
        }

        stage('Run Cypress in Docker') {
            steps {
                script {
                    def dockerImage = 'cypress/base:22.15.0'

                    // // Convert Windows path to Unix-style path
                    // def workspacePath = pwd().replace('C:\\', '/c/').replaceAll('\\\\', '/')

                    def windowsPath = pwd()
                    echo "Windows Path: ${windowsPath}"

                    def unixPath = windowsPath.replace('C:\\', '/c/').replaceAll('\\\\', '/')
                    echo "Converted Unix Path: ${unixPath}"

                    docker.image(dockerImage).inside("-v ${unixPath}:${unixPath} -w ${unixPath}") {
                        bat 'npx cypress run'
                    }
                }
            }
        }
    }
}