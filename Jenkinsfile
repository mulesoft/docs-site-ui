#!/usr/bin/env groovy

emoji = ':sadpanda:'

def defaultBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'
def failureSlackChannel = '#dux-engineering-github-prs'

// the following keywords are used to capture the correct error lines from a failed build's log
// catchKeywords must be kept in order of priority, meaning that lines with "fatal" in them is the first
// to be captured, followed by ERROR, and then by the subsequent keywords.
excludedKeywords = ['[Pipeline]', 'No such container', 'No such image', 'make: ***']
catchKeywords = ['fatal', 'ERROR', 'non-zero', 'Error', 'unauthorized']

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
            script {
              if (env.GIT_BRANCH.startsWith("PR-")) {
                slackSend color: 'danger', 
                channel: failureSlackChannel, 
                message: "${emoji} <${env.BUILD_URL}|${currentBuild.displayName}> UI bundle test failed for ${env.GIT_BRANCH}, so the ${env.GIT_BRANCH} is not updated. \
                Please run `npx gulp bundle` to see the errors, fix them, and then push the fix to retrigger this build. ${getErrorMsg()}"
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
