pipeline {
  agent any
  stages {
    stage('Preparation') {
      steps {
        echo 'Preparing Academy Vu'
        git(url: 'https://github.com/timyshark/academy-ng.git', branch: 'app-alpha-001')
      }
    }
    stage('Unit Test') {
      steps {
        echo 'Unit Testing started'
        sh 'ng test'

      }
    }
   stage('E2E Test') {
      steps {
        echo 'E2E Testing started'
        sh 'ng e2e'
      }
    }
    stage('Build') {
      steps {
        sh 'ng build'
      }
    }
   stage('Deploy') {
      steps {
        echo 'Deploying started'
      }
    }
  stage('Cleanup') {
      steps {
        echo 'Deploying started'
      }
    }
  }
}