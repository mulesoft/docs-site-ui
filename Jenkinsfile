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
      post {
        failure {
          steps {
            if (env.GIT_BRANCH.startsWith("PR-")) {
              slackSend color: 'danger', 
              channel: failureSlackChannel, 
              message: "<${env.BUILD_URL}|${currentBuild.displayName}> UI bundle test failed for ${env.GIT_BRANCH}, so the ${env.GIT_BRANCH} is not updated. \
              Please run `npx gulp bundle` to see the errors, fix them, and then push the fix to retrigger this build."
            }
          }
        }
      }
    }
    stage('Release') {
      when {
        allOf {
          anyOf {
            branch defaultBranch
            expression { return env.GIT_BRANCH.startsWith("PR-") }
          }
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
              sh "docker build --build-arg GH_TOKEN=${GH_TOKEN} --build-arg SECRET_KEY=${SECRET_KEY} --build-arg GIT_BRANCH=${env.GIT_BRANCH} -f Dockerfile ."
        }
      }
      post {
        failure {
          slackSend color: 'danger', 
          channel: failureSlackChannel, 
          message: "<${env.BUILD_URL}|${currentBuild.displayName}> UI bundle release failed for ${env.GIT_BRANCH}. Please manually start a release on Jenkins if needed."
        }
      }
    }
  }
}
