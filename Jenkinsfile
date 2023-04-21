#!/bin/env groovy

def defaultBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'
def failureSlackChannel = '#dux-engineering-github-prs'

pipeline {
  agent any
  options {
      buildDiscarder logRotator(artifactDaysToKeepStr: '7', artifactNumToKeepStr: '', daysToKeepStr: '7', numToKeepStr: '')
  }
  parameters {
    booleanParam(
      name: "MANUAL_RELEASE",
      description: "Check this box to create a manual release (default: false)",
      defaultValue: false
    )
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
            expression { return params.MANUAL_RELEASE }
            changeset "src/**"
            changeset "package*.json"            
          }
        }
      }
      steps {
        withCredentials([
          string(credentialsId: githubCredentialsId, variable: 'GH_TOKEN'),
          string(credentialsId: gpgSecretKeyCredentialsId , variable: 'SECRET_KEY')]) {
            try {
              sh "docker build --build-arg GH_TOKEN=${GH_TOKEN} --build-arg SECRET_KEY=${SECRET_KEY} --build-arg GIT_BRANCH=${env.GIT_BRANCH} -f Dockerfile ."
            } catch (Exception e) {
              slackSend color: 'danger', channel: failureSlackChannel, message: 'UI bundle release failed. Please manually start a build in Jenkins.'
            }
          }
      }
    }
  }
}