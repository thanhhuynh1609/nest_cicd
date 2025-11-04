pipeline {
  agent any

  environment {
    DOCKER_USER = "huynhthanh1609"   
    BACKEND_IMAGE = "backend"
    FRONTEND_IMAGE = "frontend" // Thay bằng Docker Hub username (hoặc set trong Jenkins global env)
    SERVER_HOST = "54.252.205.252"           // Hoặc set bằng credential / param
    SERVER_USER = "ubuntu"                  // user SSH trên EC2
  }

  options {
    skipDefaultCheckout(true)
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timestamps()
    ansiColor('xterm')
  }

  stages {

    stage('Checkout') {
      steps {
        // Checkout full repo
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/thanhhuynh1609/nest_cicd',
            credentialsId: 'github-pat'
          ]]
        ])
      }
    }

    stage('Prepare') {
      steps {
        script {
          // tag images with git short sha
          GIT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.IMAGE_TAG = "${GIT_SHA}"
          echo "Image tag will be: ${env.IMAGE_TAG}"
        }
      }
    }

    stage('Build Images') {
      parallel {
        stage('Build Backend') {
          steps {
            sh """
              # build backend image from root Dockerfile
              docker build --pull -t docker.io/${DOCKER_USER}/backend:${IMAGE_TAG} -t docker.io/${DOCKER_USER}/backend:latest -f Dockerfile .
            """
          }
        }

        stage('Build Frontend') {
          steps {
            dir('ecommerce-frontend') {
              sh """
                docker build --pull -t docker.io/${DOCKER_USER}/frontend:${IMAGE_TAG} -t docker.io/${DOCKER_USER}/frontend:latest .
              """
            }
          }
        }
      }
    }

    stage('Run Tests (optional)') {
      steps {
        echo "Run tests here if you have unit/integration tests"
        // ex: sh 'npm --prefix ./ run test' or run backend tests
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER_CRED', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "Login to Docker Hub"
            echo $DOCKER_PASS | docker login -u $DOCKER_USER_CRED --password-stdin
            docker push docker.io/$DOCKER_USER_CRED/backend:${IMAGE_TAG}
            docker push docker.io/$DOCKER_USER_CRED/backend:latest
            docker push docker.io/$DOCKER_USER_CRED/frontend:${IMAGE_TAG}
            docker push docker.io/$DOCKER_USER_CRED/frontend:latest
          '''
        }
      }
    }

    stage('Deploy to Production') {
      steps {
        sshagent (credentials: ['server-ssh-key']) {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS'),
                           string(credentialsId: 'db-conn', variable: 'DB_CONN')]) {
            sh '''
              # copy docker-compose.yml from repo to production (scp)
              scp -o StrictHostKeyChecking=no docker-compose.prod.yml ${SERVER_USER}@${SERVER_HOST}:~/project/docker-compose.yml || true

              # write .env to production (override secrets)
              ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "mkdir -p ~/project"
              ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "cat > ~/project/.env <<'EOF'
POSTGRES_DB=icloud_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=matkhau
SECRET_KEY=${SECRET_KEY:-default_secret}
DOCKERHUB_USER=${DH_USER}
BACKEND_TAG=${IMAGE_TAG}
FRONTEND_TAG=${IMAGE_TAG}
EOF
"
              # login docker on remote and deploy
              ssh -o StrictHostKeyChecking=no ${SERVER_USER}@${SERVER_HOST} "
                cd ~/project &&
                echo '${DH_PASS}' | docker login -u ${DH_USER} --password-stdin &&
                docker compose --env-file .env pull &&
                docker compose --env-file .env down &&
                docker compose --env-file .env up -d &&
                docker image prune -f
              "
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline finished successfully: ${env.BUILD_URL}"
    }
    failure {
      echo "Pipeline failed. See console output."
    }
  }
}
