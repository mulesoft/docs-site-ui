#!/bin/env groovy

def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'

pipeline {
  agent any
  stages {
    stage('Test') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        nodejs('node12') {
          sh 'npm install --quiet --no-progress --cache=.cache/npm --no-audit && gulp bundle'
        }
      }
    }
    stage('Release') {
      when {
        branch 'master'
      }
      steps {
        withCredentials([
          string(credentialsId: githubCredentialsId, variable: 'GH_TOKEN'),
          string(credentialsId: gpgSecretKeyCredentialsId , variable: 'SECRET_KEY')]) {
            sh "docker build --build-arg GH_TOKEN=${GH_TOKEN} --build-arg SECRET_KEY=${SECRET_KEY} --build-arg GIT_BRANCH=${env.GIT_BRANCH} -f Dockerfile ."
          }
      }
    }
  }
}
