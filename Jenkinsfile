#!/bin/env groovy

def gitBranch = 'master'
def gitCredentialsId = 'mule-docs-agent-ssh-key'
def githubCredentialsId = 'mule-docs-agent-github-token'

pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          if (sh(script: 'git log -1 --pretty=tformat:%s | grep -qP "^Release v\\d|\\[skip .+?\\]"', returnStatus: true) == 0) {
            env.SKIP_CI = 'true'
          }
        }
      }
    }
    stage('Install') {
      when { allOf { environment name: 'GIT_BRANCH', value: gitBranch; not { environment name: 'SKIP_CI', value: 'true' } } }
      steps {
        nodejs('node10') {
          sh 'npm install --quiet --no-progress --cache=.cache/npm --no-audit'
        }
      }
    }
    stage('Release') {
      when { allOf { environment name: 'GIT_BRANCH', value: gitBranch; not { environment name: 'SKIP_CI', value: 'true' } } }
      steps {
        dir('public') {
          deleteDir()
        }
        withCredentials([string(credentialsId: githubCredentialsId, variable: 'GITHUB_TOKEN')]) {
          nodejs('node10') {
            sh '$(npm bin)/gulp release'
          }
        }
      }
    }
  }
}
