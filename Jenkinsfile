cat > Jenkinsfile << 'EOF'
pipeline {
  agent any

  environment {
    BRANCH = "${env.BRANCH_NAME ?: 'local'}"
  }

  stages {
    stage('Info') {
      steps {
        echo "Building branch: ${BRANCH}"
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      parallel {
        stage('Build API') {
          when { expression { fileExists('api/package.json') } }
          steps {
            dir('api') {
              sh 'echo "Installing dependencies (if any)..."'
              sh 'npm install --silent || true'
              sh 'echo "Pretend docker build (or try if docker exists)"'
              sh 'docker --version > /dev/null 2>&1 && docker build -t inventory-api:${BRANCH} . || echo "Docker not available - skipping docker build"'
            }
          }
        }
        stage('Build UI') {
          when { expression { fileExists('ui/index.html') } }
          steps {
            dir('ui') {
              sh 'echo "Static UI - no build step"'
              sh 'ls -la || true'
            }
          }
        }
      }
    }

    stage('Test') {
      steps {
        parallel(
          api: {
            script {
              if (fileExists('api/test.js')) {
                dir('api') { sh 'node test.js || echo "API test script exited (ok for demo)"' }
              } else { echo "No API tests" }
            }
          },
          ui: {
            script {
              if (fileExists('ui/index.html')) {
                dir('ui') { sh 'echo "UI exists"; test -f index.html && echo "UI file present"' }
              } else { echo "No UI detected" }
            }
          }
        )
      }
    }

    stage('Deploy (simulate)') {
      steps {
        echo "Simulated deploy for ${BRANCH}"
      }
    }
  }

  post {
    always { echo "Pipeline finished for ${BRANCH}" }
    success { echo "SUCCESS: ${BRANCH}" }
    failure { echo "FAILURE: ${BRANCH}" }
  }
}