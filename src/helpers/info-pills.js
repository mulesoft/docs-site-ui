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
    if (!pill.link.startsWith('/')) return pill // Leave relative and full URLs as-is
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
