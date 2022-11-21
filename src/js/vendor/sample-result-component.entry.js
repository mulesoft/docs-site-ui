import { r as registerInstance, h, g as getElement } from './index-e533b54f.js'
import { r as resultContext } from './index-3d8edb2a.js'

const sampleResultComponentCss = 'b{color:var(--atomic-primary)}'

const SampleResultComponent = class {
  constructor (hostRef) {
    registerInstance(this, hostRef)
  }

  // We recommended fetching the result context using the `connectedCallback` lifecycle method
  // with async/await. Using `componentWillLoad` will hang the parent `atomic-search-interface` initialization.
  async connectedCallback () {
    try {
      this.result = await resultContext(this.host)
    } catch (error) {
      console.error(error)
      this.host.remove()
    }
  }

  render () {
    // Do not render the component until the result object has been resolved.
    if (!this.result) {
      return
    }
    const author = this.result.raw.author || 'anonymous'
    return h('h4', null, 'Written by: ', h('b', null, author))
  }

  get host () {
    return getElement(this)
  }
}
SampleResultComponent.style = sampleResultComponentCss

export { SampleResultComponent as sample_result_component }
