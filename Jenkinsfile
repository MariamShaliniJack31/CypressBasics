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

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'  // Use `npm install` if not using lock files
            }
        }

        stage('Run Cypress Sanity Tests') {
            steps {
                bat 'npx cypress run --spec "cypress/e2e/sanity/*.cy.js"'
            }
        }

        // stage('Generate Mochawesome Report') {
        //     steps {
        //         bat """
        //             echo Cleaning old merged report...
        //             del /f /q cypress\\reports\\merged-report.json

        //             echo Checking for Mochawesome JSON files...
        //             dir cypress\\reports\\mochawesome_*.json

        //             echo Merging reports...
        //             npx mochawesome-merge cypress\\reports\\mochawesome_*.json > cypress\\reports\\merged-report.json

        //             echo Generating HTML report...
        //             npx marge cypress\\reports\\merged-report.json --reportDir cypress\\reports\\html
        //         """
        //     }
        // }

        stage('Check Mochawesome Report') {
            steps {
                bat """
                    if exist cypress\\reports\\html\\index.html (
                        echo Mochawesome report found.
                    ) else (
                        echo ERROR: Mochawesome report not found!
                        exit /b 1
                    )
                """
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