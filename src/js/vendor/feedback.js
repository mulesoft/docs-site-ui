;(function () {
  'use strict'

  window.addEventListener('load', function () {
    var config = document.getElementById('feedback-script').dataset
    var script = document.createElement('script')
    // eslint-disable-next-line max-len
    script.src = 'https://www.mulesoft.org/jira/s/d3d4383bbc7dec0997c5f8942e211a39-T/yj47ep/73018/ad2c2c5108a33dcc7627b077d5eb43d9/2.0.23/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=' + config.collectorId // prettier-ignore
    document.body.appendChild(script)
  })
})()
