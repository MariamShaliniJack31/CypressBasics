pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/MariamShaliniJack31/CypressBasics.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'  // Use `npm install` if not using lock files
            }
        }

        stage('Run Cypress Sanity Tests') {
            steps {
                sh 'npx cypress run --spec "cypress/e2e/sanity/*.cy.js"'
            }
        }

        stage('Generate Mochawesome Report') {
            steps {
                sh '''
                    npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged-report.json
                    npx marge cypress/reports/merged-report.json --reportDir cypress/reports/html
                    '''
            }
        }

        stage('Archive Test Report') {
            steps {
                archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
            }
        }

        stage("Bye"){
            steps{
                echo "BYE"
            }
        }
    }

    
    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
