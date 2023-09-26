'use strict'

module.exports = ({
  data: {
    root: {
      page: { attributes },
    },
  },
}) => {
  const deploymentOptions = attributes['deployment-options']
  if (!deploymentOptions) return {}

  const deploymentOptionsArr = deploymentOptions.split(',').map((item) => item.trim())
  return {
    ch: deploymentOptionsArr.includes('ch'),
    ch2: deploymentOptionsArr.includes('ch2'),
    hybrid: deploymentOptionsArr.includes('hybrid'),
    pce: deploymentOptionsArr.includes('pce'),
    rtf: deploymentOptionsArr.includes('rtf'),
    cloudIDE: deploymentOptionsArr.includes('cloud-ide'),
    desktopIDE: deploymentOptionsArr.includes('desktop-ide'),
  }
}
