;(() => {
  'use strict'

  const initializeVideoHub = async () => {
    const root = document.querySelector('[data-video-results]')
    if (!root) return

    const source = document.querySelector('[data-video-source]')
    const introSource = source?.querySelector('#preamble .paragraph')
    if (introSource) {
      document.querySelector('[data-video-intro]').replaceChildren(...introSource.childNodes)
    }
    source?.remove()
    const catalogPath = document.body.dataset.videoCatalog || '_attachments/video-hub.yml'
    const catalogUrl = new URL(catalogPath, window.location.href)
    let catalog
    try {
      const catalogResponse = await fetch(catalogUrl)
      if (!catalogResponse.ok) throw new Error(`Unable to load video catalog: ${catalogResponse.status}`)
      catalog = window.jsyaml.load(await catalogResponse.text())
    } catch (error) {
      console.error('Unable to load video catalog', error)
      root.textContent = 'Videos are temporarily unavailable.'
      return
    }
    const videos = catalog.products.flatMap(({ name, videos }) => {
      const productId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      return videos.map((video) => {
        if (
          !video.id ||
          !video.vidyard_id ||
          !video.title ||
          !video.description ||
          !Array.isArray(video.topics) ||
          !Array.isArray(video.tags)
        ) {
          throw new Error(`Video in ${name} is missing a required id, vidyard_id, title, description, topics, or tags`)
        }
        return {
          ...video,
          productId,
          productName: name,
          vid: video.vidyard_id,
          docUrl: video.docs_url,
          thumbnail: video.vidyard_id
            ? `https://play.vidyard.com/${encodeURIComponent(video.vidyard_id)}.jpg`
            : '',
        }
      })
    })
    const path = catalog.learning_paths?.[0]
    const intro = document.querySelector('[data-video-intro]')
    if (catalog.intro) intro.textContent = catalog.intro
    const products = [
      ...new Map(videos.map((video) => [video.productId, video.productName])).entries(),
    ]
    const state = { product: '', topic: '', query: '' }
    const productSelect = document.querySelector('[data-video-product]')
    const topicContainer = document.querySelector('[data-video-topics]')
    const results = document.querySelector('[data-video-results]')
    const template = document.querySelector('[data-video-card-template]')
    const dialog = document.querySelector('[data-video-dialog]')
    const iframe = dialog.querySelector('[data-video-iframe]')
    const dialogTitle = dialog.querySelector('[data-video-dialog-title]')
    const dialogNewTab = dialog.querySelector('[data-video-dialog-new-tab]')
    const dialogClose = dialog.querySelector('[data-video-dialog-close]')
    const topics = [...new Set(videos.flatMap((video) => video.topics || []))]
    const categoryDescriptions = {
      eme: 'Lifecycle of an AI-connected integration portfolio',
      studio: 'The IDE for building Mule applications',
      exchange: 'Discover and reuse APIs and assets',
      mq: 'Cloud messaging for queues and exchanges',
      'runtime-fabric': 'Deploy Mule apps on your own infrastructure',
      'flex-gateway': 'Secure and manage APIs anywhere',
      'flex-gateway-pdk': 'Build custom Flex Gateway policies',
      'api-manager': 'Secure, govern, and analyze your APIs',
      'api-governance': 'Apply standards across your APIs',
      'api-experience-hub': 'Branded developer portals in minutes',
      datagraph: 'Unify APIs into a single graph',
      'partner-manager': 'Manage B2B partners and exchange',
      accelerators: 'Prebuilt assets for common use cases',
      connectors: 'Connect to external systems and AI',
    }

    products.forEach(([id, name]) => {
      const option = document.createElement('option')
      option.value = id
      option.textContent = name
      productSelect.append(option)
    })

    const topicButton = (topic, label) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'video-hub-topic'
      button.dataset.topic = topic
      button.setAttribute('aria-pressed', String(state.topic === topic))
      button.textContent = label
      topicContainer.append(button)
    }

    topicButton('', 'All topics')
    topics.forEach((topic) => topicButton(topic, topic))

    if (path && Array.isArray(path.videos) && path.videos.length) {
      const pathSection = document.querySelector('[data-video-path]')
      pathSection.hidden = false
      document.querySelector('[data-video-path-title]').textContent = path.title || ''
      document.querySelector('[data-video-path-description]').textContent = path.description || ''
      const steps = document.querySelector('[data-video-path-steps]')
      path.videos.forEach((id) => {
        const video = videos.find((item) => item.id === id)
        if (!video) return
        const step = document.createElement('li')
        step.textContent = video.title
        steps.append(step)
      })
    } else {
      document.querySelector('[data-video-path]').remove()
    }

    function renderCard (video) {
      const card = template.content.firstElementChild.cloneNode(true)
      const play = card.querySelector('[data-video-play]')
      const thumbnail = card.querySelector('[data-video-thumbnail]')
      const videoUrl = `https://share.vidyard.com/watch/${encodeURIComponent(video.vid)}`

      card.querySelector('[data-video-title]').textContent = video.title || ''
      card.querySelector('[data-video-description]').textContent = video.description || ''
      card.querySelector('[data-video-duration]').textContent = video.duration || ''
      card.querySelector('[data-video-sequence]').textContent = video.sequence || ''
      play.setAttribute('aria-label', `Play ${video.title}`)

      thumbnail.src = video.thumbnail
      play.addEventListener('click', () => openPlayer(video, videoUrl))

      const watch = card.querySelector('[data-video-watch]')
      if (videoUrl) {
        watch.href = videoUrl
        watch.target = '_blank'
        watch.rel = 'noopener'
        watch.setAttribute(
          'aria-label',
        `Watch ${video.title} on Vidyard (opens in a new tab)`
        )
      } else {
        watch.remove()
      }

      const docs = card.querySelector('[data-video-docs]')
      if (video.docUrl) {
        docs.href = video.docUrl
      } else {
        docs.remove()
      }

      const tags = card.querySelector('[data-video-tags]')
    ;(video.tags || []).forEach((tag) => {
        const item = document.createElement('li')
        item.textContent = tag
        tags.append(item)
      })
      return card
    }

    function render () {
      const matched = videos.filter((video) => {
        const searchableFields = [video.title, video.description, ...(video.tags || []), ...(video.topics || [])]
        const searchable = searchableFields.join(' ').toLowerCase()
        return (!state.product || video.productId === state.product) &&
        (!state.topic || (video.topics || []).includes(state.topic)) &&
        (!state.query || searchable.includes(state.query))
      })
      const countLabel = matched.length === 1 ? 'video' : 'videos'
      document.querySelector('[data-video-count]').textContent = `${matched.length} ${countLabel}`
      results.replaceChildren()

      const grouped = new Map()
      matched.forEach((video) => {
        if (!grouped.has(video.productId)) grouped.set(video.productId, [])
        grouped.get(video.productId).push(video)
      })

      grouped.forEach((items, productId) => {
        const section = document.createElement('section')
        section.className = 'video-hub-category'
        section.id = `video-product-${productId}`
        const headingRow = document.createElement('div')
        headingRow.className = 'video-hub-category-head'
        const heading = document.createElement('h2')
        heading.textContent = items[0].productName
        const headingId = `video-category-${productId}`
        heading.id = headingId
        section.setAttribute('aria-labelledby', headingId)
        const count = document.createElement('span')
        count.textContent = `${items.length} ${items.length === 1 ? 'video' : 'videos'}`
        const description = document.createElement('span')
        description.className = 'video-hub-category-description'
        description.textContent = categoryDescriptions[productId] || ''
        const grid = document.createElement('div')
        grid.className = 'video-hub-grid'
        items.forEach((video) => grid.append(renderCard(video)))
        headingRow.append(heading, count, description)
        section.append(headingRow, grid)
        results.append(section)
      })

      if (!matched.length) {
        const empty = document.createElement('p')
        empty.className = 'video-hub-empty'
        empty.textContent = 'No videos match these filters. Try changing or clearing them.'
        results.append(empty)
      }
    }

    function openPlayer (video, videoUrl) {
      dialogTitle.textContent = video.title
      dialogNewTab.href = videoUrl
      iframe.src = `https://play.vidyard.com/${encodeURIComponent(video.vid)}.html?autoplay=1`
      dialog.showModal()
      dialogClose.focus()
    }

    function closePlayer () {
      iframe.src = ''
      dialog.close()
    }

    document.querySelector('[data-video-search]').addEventListener('input', (event) => {
      state.query = event.target.value.trim().toLowerCase()
      render()
    })
    productSelect.addEventListener('change', (event) => {
      state.product = event.target.value
      render()
    })
    topicContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-topic]')
      if (!button) return
      state.topic = button.dataset.topic
      topicContainer.querySelectorAll('[data-topic]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button))
      })
      render()
    })
    const pathLink = document.querySelector('[data-video-path-link]')
    pathLink?.addEventListener('click', (event) => {
      event.preventDefault()
      state.product = ''
      state.topic = ''
      state.query = ''
      productSelect.value = ''
      document.querySelector('[data-video-search]').value = ''
      topicContainer.querySelectorAll('[data-topic]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item.dataset.topic === ''))
      })
      render()
      const firstPathVideo = path && videos.find((video) => video.id === path.videos[0])
      const section = firstPathVideo && document.getElementById(`video-product-${firstPathVideo.productId}`)
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    dialogClose.addEventListener('click', closePlayer)
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closePlayer()
    })

    render()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVideoHub, { once: true })
  } else {
    initializeVideoHub()
  }
})()
