;(function () {
  'use strict'

  var doc = document.querySelector('.doc')
  if (!doc) return
  var sidebar = document.querySelector('.js-toc')
  var menu
  var headings = find('.sect1 > h2[id]', doc)
  if (!headings.length) {
    if (sidebar) {
      sidebar.parentNode.removeChild(sidebar)
      document.querySelector('.main').classList.add('no-sidebar')
    }
    return
  }
  var lastActiveFragment
  var links = {}

  var list = headings.reduce(function (accum, heading) {
    var link = toArray(heading.childNodes).reduce(function (target, child) {
      if (child.nodeName !== 'A') target.appendChild(child.cloneNode(true))
      return target
    }, document.createElement('a'))
    links[(link.href = '#' + heading.id)] = link
    var listItem = document.createElement('li')
    listItem.appendChild(link)
    accum.appendChild(listItem)
    return accum
  }, document.createElement('ol'))

  if (!(menu = sidebar && sidebar.querySelector('.toc-menu'))) {
    menu = document.createElement('div')
    menu.className = 'toc-menu'
  }

  menu.appendChild(list)

  if (sidebar) window.addEventListener('scroll', onScroll)

  var startOfContent = doc.querySelector('h1.page + *')
  if (startOfContent) {
    // generate list
    var options = headings.reduce(function (accum, heading) {
      var option = toArray(heading.childNodes).reduce(function (target, child) {
        if (child.nodeName !== 'A') target.appendChild(child.cloneNode(true))
        return target
      }, document.createElement('option'))
      option.value = '#' + heading.id
      accum.appendChild(option)
      return accum
    }, document.createElement('select'))

    var selectWrap = document.createElement('div')
    selectWrap.classList.add('select-wrapper')
    selectWrap.appendChild(options)

    // create jump to label
    var jumpTo = document.createElement('option')
    jumpTo.innerHTML = 'Jump to…'
    jumpTo.setAttribute('disabled', true)
    options.insertBefore(jumpTo, options.firstChild)
    options.className = 'toc toc-embedded select'

    // jump on change
    options.addEventListener('change', function (e) {
      var thisOptions = e.currentTarget.options
      window.location.hash = thisOptions[thisOptions.selectedIndex].value
    })

    // add to page
    doc.insertBefore(selectWrap, startOfContent)
  }

  function onScroll () {
    // NOTE equivalent to: doc.parentNode.getBoundingClientRect().top + window.pageYOffset
    var targetPosition = doc.parentNode.offsetTop
    var activeFragment
    headings.some(function (heading) {
      if (heading.getBoundingClientRect().top < targetPosition) {
        activeFragment = '#' + heading.id
      } else {
        return true
      }
    })
    if (activeFragment) {
      if (lastActiveFragment) {
        links[lastActiveFragment].classList.remove('active')
      }
      var activeLink = links[activeFragment]
      activeLink.classList.add('active')
      if (menu.scrollHeight > menu.offsetHeight) {
        menu.scrollTop = Math.max(0, activeLink.offsetTop + activeLink.offsetHeight - menu.offsetHeight)
      }
      lastActiveFragment = activeFragment
    } else if (lastActiveFragment) {
      links[lastActiveFragment].classList.remove('active')
      lastActiveFragment = undefined
    }
  }

  function find (selector, from) {
    return toArray((from || document).querySelectorAll(selector))
  }

  function toArray (collection) {
    return [].slice.call(collection)
  }
})()
