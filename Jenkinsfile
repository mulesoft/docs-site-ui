#!/bin/env groovy

def defaultBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'
def failureSlackChannel = '#doc-build-failures'

pipeline {
  agent any
  options {
      buildDiscarder logRotator(artifactDaysToKeepStr: '7', artifactNumToKeepStr: '', daysToKeepStr: '7', numToKeepStr: '')
  }
  stages {
    stage('Test') {
      when {
        not {
          branch defaultBranch
        }
      }
      steps {
        nodejs('node12') {
          sh 'npm ci'
          sh 'npx gulp bundle'
        }
      }
    }
    stage('Release') {
      when {
        allOf {
          branch defaultBranch
          anyOf {
            changeset "src/**"
            changeset "package*.json"
            manual true
          }
        }
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
  post {
      failure {
          deleteDir()
          script {
              slackSend color: 'danger', channel: failureSlackChannel, message: 'UI bundle release failed. Please manually start a build in Jenkins.'
          }
      }
  }
}
