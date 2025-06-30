node {
    stage('Checkout Code') {
        git branch: 'main', url: 'https://github.com/MariamShaliniJack31/CypressBasics.git'
    }

    stage('Run Cypress in Docker') {
        docker.image('cypress/base:22.15.0').inside {
            stage('Install Dependencies') {
                sh 'npm ci' // Linux shell inside container
            }

            stage('Run Cypress Sanity Tests') {
                sh 'npx cypress run --spec "cypress/e2e/sanity/*.cy.js"'
            }

            stage('Check Mochawesome Report') {
                sh '''
                    if [ -f cypress/reports/html/index.html ]; then
                        echo "Mochawesome report found."
                    else
                        echo "ERROR: Mochawesome report not found!"
                        exit 1
                    fi
                '''
            }

            stage('Archive Report') {
                archiveArtifacts artifacts: 'cypress/reports/html/**/*', allowEmptyArchive: true
            }
        }
    }

    stage('Bye') {
        echo "BYE"
    }
}