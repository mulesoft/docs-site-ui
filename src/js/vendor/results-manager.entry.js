import { r as registerInstance, h } from './index-e533b54f.js'

const template1 =
  '<style>\n    .field {\n        display: inline-flex;\n        white-space: nowrap;\n        align-items: center;\n    }\n\n    .field-label {\n        font-weight: bold;\n        margin-right: 0.25rem;\n    }\n</style>\n<atomic-result-section-visual image-size="icon">\n    <atomic-field-condition if-not-defined="thumbnailurl">\n        <atomic-result-icon class="icon"></atomic-result-icon>\n    </atomic-field-condition>\n    <atomic-field-condition if-defined="thumbnailurl">\n        <atomic-result-image field="thumbnailurl"></atomic-result-image>\n    </atomic-field-condition>\n</atomic-result-section-visual>\n<atomic-result-section-badges> </atomic-result-section-badges>\n<atomic-result-section-title>\n    <atomic-result-link></atomic-result-link>\n</atomic-result-section-title>\n<atomic-result-section-title-metadata> </atomic-result-section-title-metadata>\n<atomic-result-section-excerpt>\n    <atomic-result-text field="excerpt"></atomic-result-text>\n</atomic-result-section-excerpt>\n<atomic-result-section-bottom-metadata>\n    <atomic-result-fields-list> </atomic-result-fields-list>\n</atomic-result-section-bottom-metadata>\n'

const template2 =
  '<style>\n    .field {\n        display: inline-flex;\n        white-space: nowrap;\n        align-items: center;\n    }\n\n    .field-label {\n        font-weight: bold;\n        margin-right: 0.25rem;\n    }\n</style>\n<atomic-result-section-visual image-size="icon">\n    <atomic-field-condition if-not-defined="thumbnailurl">\n        <atomic-result-icon class="icon"></atomic-result-icon>\n    </atomic-field-condition>\n    <atomic-field-condition if-defined="thumbnailurl">\n        <atomic-result-image field="thumbnailurl"></atomic-result-image>\n    </atomic-field-condition>\n</atomic-result-section-visual>\n<atomic-result-section-badges> </atomic-result-section-badges>\n<atomic-result-section-title>\n    <atomic-result-link></atomic-result-link>\n</atomic-result-section-title>\n<atomic-result-section-title-metadata> </atomic-result-section-title-metadata>\n<atomic-result-section-excerpt>\n    <atomic-result-text field="excerpt"></atomic-result-text>\n</atomic-result-section-excerpt>\n<atomic-result-section-bottom-metadata>\n    <atomic-result-fields-list> </atomic-result-fields-list>\n</atomic-result-section-bottom-metadata>\n'

const template3 =
  '<style>\n    .field {\n        display: inline-flex;\n        white-space: nowrap;\n        align-items: center;\n    }\n\n    .field-label {\n        font-weight: bold;\n        margin-right: 0.25rem;\n    }\n</style>\n<atomic-result-section-visual image-size="none">\n    <atomic-field-condition if-not-defined="thumbnailurl">\n        <atomic-result-icon class="icon"></atomic-result-icon>\n    </atomic-field-condition>\n    <atomic-field-condition if-defined="thumbnailurl">\n        <atomic-result-image field="thumbnailurl"></atomic-result-image>\n    </atomic-field-condition>\n</atomic-result-section-visual>\n<atomic-result-section-badges> </atomic-result-section-badges>\n<atomic-result-section-title>\n    <atomic-result-link></atomic-result-link>\n</atomic-result-section-title>\n<atomic-result-section-title-metadata> </atomic-result-section-title-metadata>\n<atomic-result-section-excerpt>\n    <atomic-result-text field="excerpt"></atomic-result-text>\n</atomic-result-section-excerpt>\n<atomic-result-section-bottom-metadata>\n    <atomic-result-fields-list>\n        <atomic-field-condition class="field" if-defined="version">\n            <atomic-result-text field="version"></atomic-result-text>\n        </atomic-field-condition>\n        <atomic-field-condition class="field" if-defined="product">\n            <atomic-result-text field="product"></atomic-result-text>\n        </atomic-field-condition>\n    </atomic-result-fields-list>\n</atomic-result-section-bottom-metadata>\n'

const template4 =
  '<style>\n    .field {\n        display: inline-flex;\n        white-space: nowrap;\n        align-items: center;\n    }\n\n    .field-label {\n        font-weight: bold;\n        margin-right: 0.25rem;\n    }\n\n    .badge-source::part(result-badge-element) {\n        background-color: #c0c0c0;\n    }\n\n    .badge-source::part(result-badge-label) {\n        color: #000000;\n    }\n</style>\n<atomic-result-section-visual image-size="icon">\n    <atomic-field-condition if-not-defined="thumbnailurl">\n        <atomic-result-icon class="icon"></atomic-result-icon>\n    </atomic-field-condition>\n    <atomic-field-condition if-defined="thumbnailurl">\n        <atomic-result-image field="thumbnailurl"></atomic-result-image>\n    </atomic-field-condition>\n</atomic-result-section-visual>\n<atomic-result-section-badges>\n    <atomic-result-badge class="badge-source" field="source"></atomic-result-badge>\n</atomic-result-section-badges>\n<atomic-result-section-title>\n    <atomic-result-link></atomic-result-link>\n</atomic-result-section-title>\n<atomic-result-section-title-metadata> </atomic-result-section-title-metadata>\n<atomic-result-section-excerpt>\n    <atomic-result-text field="excerpt"></atomic-result-text>\n</atomic-result-section-excerpt>\n<atomic-result-section-bottom-metadata>\n    <atomic-result-fields-list>\n        <atomic-field-condition class="field" if-defined="source">\n            <atomic-result-text field="source"></atomic-result-text>\n        </atomic-field-condition>\n        <atomic-field-condition class="field" if-defined="language">\n            <span class="field-label"><atomic-text value="language"></atomic-text>:</span>\n            <atomic-result-text field="language"></atomic-result-text>\n        </atomic-field-condition>\n    </atomic-result-fields-list>\n</atomic-result-section-bottom-metadata>\n'

const ResultsManager = class {
  constructor (hostRef) {
    registerInstance(this, hostRef)
  }

  render () {
    return h(
      'atomic-result-list',
      {
        'fields-to-include': 'product,version,version,date,source,source,language,version,product',
        display: 'list',
        density: 'comfortable',
      },
      h(
        'atomic-result-template',
        { 'must-match-source': 'Tutorials-How-Tos' },
        h('template', { innerHTML: template1 })
      ),
      h('atomic-result-template', { 'must-match-source': 'Mulesoft Blogs' }, h('template', { innerHTML: template2 })),
      h(
        'atomic-result-template',
        { 'must-match-source': 'MuleSoft Documentation Production' },
        h('template', { innerHTML: template3 })
      ),
      h('atomic-result-template', null, h('template', { innerHTML: template4 }))
    )
  }
}

export { ResultsManager as results_manager }
