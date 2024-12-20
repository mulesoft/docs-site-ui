'use strict'

module.exports = ({
  data: {
    root: {
      page: { attributes },
    },
  },
}) => {
  const definedPills = [
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

  const attributePills = attributes['info-pills']
  if (!attributePills) return {}
  const attributePillsArray = attributePills.split(',').map((item) => item.trim())

  const mergedPills = definedPills.map((pill) => ({
    ...fallbackPillValues,
    ...pill,
  }))

  const pillsToDisplay = mergedPills.filter((pill) => {
    return attributePillsArray.includes(pill.name)
  })

  return pillsToDisplay
}
