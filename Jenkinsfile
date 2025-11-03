pipeline {
  agent any

  environment {
    // Detect current branch or default to 'local' when run manually
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
        // Get the code from GitHub
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
              // Simulate API build (no actual docker/npm needed)
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
              // Simulate UI build (no actual npm)
              sh 'echo "Static UI detected. No build step required."'
              sh 'ls -la || true'
            }
          }
        }
      }
    }

    stage('Test') {
      steps {
        echo "🧪 Running tests (simulated)..."
        // Parallel testing example (no real tests needed)
        parallel(
          API_Tests: {
            script {
              if (fileExists('api')) {
                dir('api') { sh 'echo "API test passed ✅"' }
              } else {
                echo "No API folder found."
              }
            }
          },
          UI_Tests: {
            script {
              if (fileExists('ui')) {
                dir('ui') { sh 'echo "UI test passed ✅"' }
              } else {
                echo "No UI folder found."
              }
            }
          }
        )
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
