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
                    def windowsPath = pwd()
                    echo "Windows Path: ${windowsPath}"

                    def unixPath = windowsPath.replace('C:\\', '/c/').replaceAll('\\\\', '/')
                    echo "Converted Unix Path: ${unixPath}"

                    bat """
                        docker run --rm ^
                          -v "${unixPath}:${unixPath}" ^
                          -w "${unixPath}" ^
                          cypress/base:22.15.0 ^
                          sh -c "npm install && npx cypress run --spec 'cypress/e2e/sanity/*.cy.js'"
                    """
                }
            }
        }
    }
}