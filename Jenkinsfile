#!/bin/env groovy

def gitBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'

pipeline {
  agent any
  stages {
    stage('Configure') {
      steps {
        script {
          if (sh(script: 'git log -1 --pretty=tformat:%s | grep -qP "^Release v\\d|\\[skip .+?\\]"', returnStatus: true) == 0) {
            echo 'Skipping build as instructed by commit message.'
            env.SKIP_CI = 'true'
            currentBuild.result = 'ABORTED'
          }
        }
      }
    }
    stage('Install') {
      when { not { environment name: 'SKIP_CI', value: 'true' } }
      steps {
        nodejs('node12') {
          sh 'npm install --quiet --no-progress --cache=.cache/npm --no-audit'
        }
      }
    }
    stage('Build') {
      when { not { environment name: 'SKIP_CI', value: 'true' } }
      steps {
        nodejs('node12') {
          sh 'npx gulp bundle'
        }
      }
    }
    stage('Release') {
      when { allOf { environment name: 'GIT_BRANCH', value: gitBranch; not { environment name: 'SKIP_CI', value: 'true' } } }
      steps {
        withCredentials([string(credentialsId: githubCredentialsId, variable: 'GITHUB_TOKEN')]) {
          nodejs('node12') {
            sh 'npx gulp release:publish'
          }
        }
      }
    }
  }
}
