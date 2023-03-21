#!/bin/env groovy

def gitBranch = 'master'
def githubCredentialsId = 'GH_TOKEN'
def gpgSecretKeyCredentialsId = 'ms-cx-engineering-gpg-private-key'

pipeline {
  agent any
  stages {
    stage('Trigger Valkyr Build') {
      steps {
        valkyrBuild()
      }
    }
  }
}
