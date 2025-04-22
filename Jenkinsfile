#!/usr/bin/env groovy

@Library('dev-docs-jenkins-shared-library') _

emoji = ':sadpanda:'

def defaultBranch = 'main'
def failureSlackChannel = '#dux-engineering-github-prs'

pipeline {
  agent any
  options {
      buildDiscarder logRotator(artifactDaysToKeepStr: '7', artifactNumToKeepStr: '', daysToKeepStr: '7', numToKeepStr: '')
  }
  parameters {
    booleanParam(
      name: 'MANUAL_RELEASE',
      description: 'Check this box to create a manual release (default: false)',
      defaultValue: false
    )
  }
  stages {
    stage('Checkout') {
      steps {
          checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
        installNode()
        installNodeDependencies()
      }
    }
    stage('Test') {
      when {
        not {
          branch defaultBranch
        }
      }
      steps {
        sh 'npx gulp bundle'
      }
      post {
        failure {
          steps {
            script {
              if (isPR()) {
                slackSend color: 'danger',
                channel: failureSlackChannel,
                message: "${emoji} <${env.BUILD_URL}|${currentBuild.displayName}> UI bundle test failed for ${env.GIT_BRANCH}, so the ${env.GIT_BRANCH} is not updated. \
                Please run `npm run format:bundle` to see the errors, fix those errors, and then push the fix to retrigger this build. ${getErrorMsg()}"
              }
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
            expression { return env.GIT_BRANCH.startsWith('PR-') }
          }
          anyOf {
            expression { return params.MANUAL_RELEASE }
            changeset 'src/**'
            changeset 'package*.json'
          }
        }
      }
      steps {
        release()
      }
      post {
        failure {
          slackSend color: 'danger',
          channel: failureSlackChannel,
          message: "${emoji} <${env.BUILD_URL}|${currentBuild.displayName}> UI bundle release failed for ${env.GIT_BRANCH}. \
          Please manually start a release on Jenkins if needed. ${getErrorMsg()}"
        }
      }
    }
  }
}

String getErrorMsg() {
  def logLines = currentBuild.rawBuild.getLog(Integer.MAX_VALUE)
  return buildUtils.getErrorMsg(logLines, buildUtils.getCatchKeywords(), buildUtils.getExcludedKeywords())
}

void installNode() {
  withCredentials([string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN')]) {
    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash'
    env.ECHO_CMD = 'echo $NVM_BIN'
    env.NVM_BIN = sh (
      script: 'bash -l -c "source $HOME/.nvm/nvm.sh 1>&2 ; nvm use 1>&2 || nvm install 1>&2 && nvm use 1>&2 && $ECHO_CMD"',
      returnStdout: true
    ).trim()
    echo "NVM_BIN: ${env.NVM_BIN}"
    env.PATH = "${env.NVM_BIN}:${env.PATH}"
    sh 'npm config set @mulesoft:registry=https://nexus3.build.msap.io/repository/npm-internal/'
    sh "npm config set //nexus3.build.msap.io/repository/npm-internal/:_authToken=${NPM_TOKEN}"
  }
}

void installNodeDependencies() {
  sh 'npm ci --cache=.cache/npm --no-audit'
}

boolean isPR() {
  return env.GIT_BRANCH.startsWith('PR-')
}

void release() {
  withCredentials([
    string(credentialsId: 'GH_TOKEN_EMU', variable: 'GH_TOKEN'),
    string(credentialsId: 'ms-cx-engineering-gpg-private-key-emu' , variable: 'SECRET_KEY')]) {
    sh 'export GIT_BRANCH=env.GIT_BRANCH'
    sh 'npm run release'
  }
}
