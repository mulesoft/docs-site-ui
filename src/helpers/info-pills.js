'use strict'

module.exports = ({
  data: {
    root: {
      page: { attributes },
      site,
    },
  },
}) => {
  const pillsConfig = [
    /* Usage:
      name: 'Attribute value assigned to :page-info-pills:',
      link: 'Absolute/relative URL',
      text/title/alt: 'Name of key in src/locales/messages.json',
      icon: 'Name of file in src/img/icons',
     */
    {
      name: 'anypoint-pricing-core',
      link: '/monitoring/#billing',
      text: 'pill-anypoint-pricing-core-text',
      title: 'pill-anypoint-pricing-core-title',
    },
    {
      name: 'anypoint-pricing-titanium',
      link: '/monitoring/#billing',
      text: 'pill-anypoint-pricing-titanium-text',
      title: 'pill-anypoint-pricing-titanium-title',
    },
  ]

  const fallbackPillValues = {
    alt: 'pill-info-icon-alt',
    icon: 'info.svg',
  }

  const pillsOnPage = attributes['info-pills']
  if (!pillsOnPage) return {}
  const pillsOnPageArray = pillsOnPage.split(',').map((item) => item.trim())

  const mergedPills = pillsConfig.map((pill) => ({
    ...fallbackPillValues,
    ...pill,
  }))

  const mergedPillsFixedLinks = mergedPills.map((pill) => {
    if (!pill.link.startsWith('/')) return pill
    if (site.keys.siteProfile === 'jp') {
      pill.link = `/jp${pill.link}`
    }
    return pill
  })

  const pillsToDisplay = mergedPillsFixedLinks.filter((pill) => {
    return pillsOnPageArray.includes(pill.name)
  })

  return pillsToDisplay
}
