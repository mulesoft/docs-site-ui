#!/usr/bin/env groovy

emoji = ':sadpanda:'

def defaultBranch = 'main'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'
def failureSlackChannel = '#dux-engineering-github-prs'

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
      name: "MANUAL_RELEASE",
      description: "Check this box to create a manual release (default: false)",
      defaultValue: false
    )
  }
  stages {
    stage('Checkout') {
      steps {
          checkout scm
      }
    }
    stage('Test') {
      // when {
      //   not {
      //     branch defaultBranch
      //   }
      // }
      steps {
        withCredentials([string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN')]) {
          script {
            sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs'
            sh 'npm ci --cache=.cache/npm --no-audit' 
            sh 'npx gulp bundle'  
          }
        }
      }
      // post {
      //   failure {
      //     steps {
      //       script {
      //         if (env.GIT_BRANCH.startsWith("PR-")) {
      //           slackSend color: 'danger', 
      //           channel: failureSlackChannel, 
      //           message: "${emoji} <${env.BUILD_URL}|${currentBuild.displayName}> UI bundle test failed for ${env.GIT_BRANCH}, so the ${env.GIT_BRANCH} is not updated. \
      //           Please run `npx gulp bundle` to see the errors, fix them, and then push the fix to retrigger this build. ${getErrorMsg()}"
      //         }
      //       }
      //     }
      //   }
      // }
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
          string(credentialsId: gpgSecretKeyCredentialsId , variable: 'SECRET_KEY'),
          string(credentialsId: 'NPM_TOKEN', variable: 'NPM_TOKEN')]) {
            sh "docker build --build-arg GH_TOKEN=${GH_TOKEN} --build-arg SECRET_KEY=${SECRET_KEY} --build-arg GIT_BRANCH=${env.GIT_BRANCH} --build-arg NPM_TOKEN=${NPM_TOKEN} -f Dockerfile ."
        }
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
        def filteredLines = linesWithoutExcludedKeywords.findAll {it.contains(keyword)}
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
