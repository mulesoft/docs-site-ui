#!/usr/bin/env groovy

emoji = ':sadpanda:'

def defaultBranch = 'main'
def failureSlackChannel = '#dux-engineering-github-prs'
def nodeVersion = '20'

// the following keywords are used to capture the correct error lines from a failed build's log

// excludedKeywords are in alphabetical order and are case-sensitive
excludedKeywords = ['[Pipeline]', 'make: ***', 'No such container', 'No such image']

// catchKeywords must be kept in order of priority and are case-sensitive
catchKeywords = [
    'failed build', // failed CorePaaS builds. Since we don't have the capability to get the failed downstream job, this will do
    ' 503 ', // 503 service not available. Happens when services like Jenkins, GUS, Nexus are down
    ' 400 ', // 400 bad request. Happens when services like Jenkins, GUS, Nexus are not acting correctly
    'fatal', // fatal errors, especially ones from Antora builds
    'process apparently never started', // Jenkins restarts and breaks the build
    'unauthorized', // permission issue typically from GitHub or Docker. Usually temporary and will go away on its own
    'HttpError', // http related errors like rate limiting
    'non-zero', // generic errors for non-zero error codes
    'ERROR', // generic errors
    'Error', // generic errors
]

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
        installNode(nodeVersion)
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

def getErrorLine(lines, catchKeywords, excludedKeywords) {
  def linesWithoutExcludedKeywords = lines.findAll { line ->
    !excludedKeywords.any { keyword -> line.contains(keyword) }
  }

  def errorLine
  for (keyword in catchKeywords) {
    def filteredLines = linesWithoutExcludedKeywords.findAll { it.contains(keyword) }
    if (filteredLines.size() > 0) {
      errorLine = filteredLines.last()
      break
    }
  }

  return errorLine ?: 'Unknown error, check the build logs'
}

def getErrorMsg() {
  def logLines = currentBuild.rawBuild.getLog(Integer.MAX_VALUE)
  return " ```${getErrorLine(logLines, catchKeywords, excludedKeywords)}```"
}

void installNode(String nodeVersion) {
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

def isPR() {
  return env.GIT_BRANCH.startsWith('PR-')
}

void release() {
  withCredentials([
    string(credentialsId: 'GH_TOKEN', variable: 'GH_TOKEN'),
    string(credentialsId: 'ms-cx-engineering-gpg-private-key' , variable: 'SECRET_KEY')]) {
    sh 'export GIT_BRANCH=env.GIT_BRANCH'
    sh 'npm run release'
    }
}
