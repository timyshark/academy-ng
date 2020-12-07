pipeline {
  agent any
  stages {
    stage('Preparation') {
      steps {
        echo 'Preparing Academy Vu'
        git(url: 'https://github.com/timyshark/academy-ng.git', branch: 'app-alpha-001')
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

  }
}