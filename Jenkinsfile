#!/bin/env groovy

def gitBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'

pipeline {
  agent docker
  stages {
    stage('Release') {
      steps {
        sh "docker build --build-arg GH_TOKEN=${GH_TOKEN} --build-arg SECRET_KEY=${SECRET_KEY} -f Dockerfile ."
      }
    }
  }
}
