;(() => {
  const icon = require('@mulesoft/lume-icon')
  const customElements = window.customElements
  if (!customElements.get('lume-icon')) {
    customElements.define('lume-icon', icon)
  }

  // // testing with the following block
  // // https://github.com/mulesoft/lume-design-system/blob/master/packages/lume-icons/README.md
  // // https://lume.mulesoft.com/?path=/story/introduction-using-icon--page
  // const test = document.createElement('lume-icon')
  // test.setAttribute('set', 'classic')
  // test.setAttribute('href', 'https://cdn.anypoint.mulesoft.com')
  // test.setAttribute('symbol', 'access-management-color')
  // const doc = document.querySelector('article.doc')
  // doc.insertBefore(test, doc.firstChild)
})()
