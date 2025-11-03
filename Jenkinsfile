pipeline {
  agent any

  environment {
    BRANCH = "${env.BRANCH_NAME ?: 'local'}"
  }

  stages {

    stage('Info') {
      steps {
        echo "🚀 Starting pipeline for branch: ${BRANCH}"
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
        echo "✅ Code checked out successfully."
      }
    }

    stage('Build') {
      parallel {
        stage('Build API') {
          when { expression { fileExists('api') } }
          steps {
            dir('api') {
              echo "🔧 Building API..."
              sh 'echo "Pretending to install dependencies and build API..."'
              sh 'ls -la || true'
            }
          }
        }

        stage('Build UI') {
          when { expression { fileExists('ui') } }
          steps {
            dir('ui') {
              echo "🎨 Building UI..."
              sh 'echo "Static UI detected. No build step required."'
              sh 'ls -la || true'
            }
          }
        }
      }
    }

    stage('Test') {
      parallel {
        stage('API Tests') {
          steps {
            script {
              if (fileExists('api')) {
                dir('api') { sh 'echo "✅ API tests passed successfully."' }
              } else {
                echo "No API folder found."
              }
            }
          }
        }

        stage('UI Tests') {
          steps {
            script {
              if (fileExists('ui')) {
                dir('ui') { sh 'echo "✅ UI tests passed successfully."' }
              } else {
                echo "No UI folder found."
              }
            }
          }
        }
      }
    }

    stage('Deploy (Simulated)') {
      steps {
        echo "🚢 Deploying (simulated) for branch: ${BRANCH}"
        echo "Deployment successful ✅"
      }
    }
  }

  post {
    always {
      echo "------------------------------------"
      echo "🏁 Pipeline finished for ${BRANCH}"
      echo "------------------------------------"
    }
    success { echo "✅ SUCCESS: ${BRANCH}" }
    failure { echo "❌ FAILURE: ${BRANCH}" }
  }
}
