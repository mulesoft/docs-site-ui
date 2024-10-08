;(() => {
  'use strict'

  const tableShowText = MSCX.l10n.getMessage('mobile-table-show')
  const tableToggleText = MSCX.l10n.getMessage('mobile-table-toggle')

  const panels = document.querySelector('div.panels')

  const addDataHeader = (tableRow, headerTexts) => {
    const tableCells = getDirectTableCells(tableRow)
    tableCells.forEach((tableCell, indexNum) => {
      const headerText = headerTexts[indexNum]
      if (hasContent(headerText)) tableCell.setAttribute('data-header', headerText)
    })
  }

  const addDataHeaders = (table) => {
    const tableHeaderTextsObj = getTableHeaderTextsObj(table)
    if (
      isHeavyLeftColumn(tableHeaderTextsObj, 15) ||
      (isNestedTable(table) && isHeavyLeftColumn(tableHeaderTextsObj, 10))
    ) {
      table.classList.add('half-page')
    }
    getRows(table).forEach((tableRow) => addDataHeader(tableRow, Object.keys(tableHeaderTextsObj)))
  }

  const addMobileHiddenButton = (table) => {
    const hideButtonSpan = document.createElement('span')
    hideButtonSpan.classList.add('table-toggle-row')
    table.insertBefore(hideButtonSpan, table.firstElementChild)

    const hideButton = getHideButton()
    hideButtonSpan.appendChild(hideButton)

    hideButton.addEventListener('click', (e) => {
      e.preventDefault()
      toggleVisibility(table)
      handleToggle(hideButton)
    })
  }

  const adjustMobileColumnWidth = (tableColumns, widthMap, e) => {
    if (e) e.preventDefault()
    tableColumns.forEach((col, index) => {
      setColWidth(col, isBigScreenSize() ? widthMap[index] : '100%')
    })
  }

  const contains = (parent, child) => parent?.contains(child)
  const getAllTableColumns = () => document.querySelectorAll('table:not(div.panel table) > colgroup > col')
  const getAllTables = () =>
    document.querySelectorAll(
      'table:not(.connectors-table, div.admonitionblock table, div.colist table, div.panels table)'
    )

  // getDirectTableCells' implementation excludes the table cells from nested tables
  const getDirectTableCells = (tableRow) => Array.from(tableRow.children).filter((child) => child.tagName === 'TD')
  const getRows = (table) => table.querySelectorAll('tr')

  const getHideButton = () => {
    let hideButton = document.createElement('button')
    hideButton = setHideButtonAttributes(hideButton)

    const hideButtonHelperText = document.createElement('p')
    hideButtonHelperText.innerText = tableShowText
    hideButton.appendChild(hideButtonHelperText)

    const hideButtonImg = getHideButtonImg()
    hideButton.appendChild(hideButtonImg)

    return hideButton
  }

  const getHideButtonImg = () => {
    let hideButtonImg = document.createElement('img')
    hideButtonImg = setHideButtonImgAttributes(hideButtonImg)
    return hideButtonImg
  }

  const getTableColumnsWidthMap = (tableColumns) => {
    const columnsWidthMap = {}
    tableColumns.forEach((col, index) => {
      columnsWidthMap[index] = col.style.width
    })
    return columnsWidthMap
  }

  const getTableHeaderTextsObj = (table) => {
    const output = {}
    const tableHeaders = table.querySelectorAll('th')
    tableHeaders.forEach((header) => {
      output[header.textContent] = header.colSpan
    })
    return output
  }

  const handleTableColumns = (tableColumns) => {
    const tableColumnsWidthMap = getTableColumnsWidthMap(tableColumns)
    adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap)
    window.addEventListener('resize', (e) => adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap, e))
  }

  const handleToggle = (hideButton) => {
    const ariaExpandedValue = hideButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    hideButton.setAttribute('aria-expanded', ariaExpandedValue)
  }

  const hasContent = (text) => text?.length
  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

  const isHeavyLeftColumn = (obj, charLimit) => {
    for (const key in obj) {
      if (obj[key] <= 1) {
        const words = key.split(' ')

        for (let i = 0; i < words.length; i++) {
          const word = words[i]
          if (word.length >= charLimit) return true
        }
      }
    }
    return false
  }

  const isNestedTable = (table) => {
    const tableParent = table.parentNode
    return tableParent.tagName === 'DIV' && tableParent.className.includes('content')
  }

  const setColWidth = (col, width) => {
    col.style.width = width
  }

  const setHideButtonAttributes = (hideButton) => {
    const label = tableToggleText

    hideButton.classList.add('flex', 'table-toggle')
    hideButton.setAttribute('aria-expanded', true)
    hideButton.setAttribute('aria-label', label)
    hideButton.setAttribute('title', label)
    hideButton.type = 'button'
    return hideButton
  }

  const setHideButtonImgAttributes = (hideButtonImg) => {
    hideButtonImg.loading = 'lazy'
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    hideButtonImg.src = `${uiRootPath}/img/icons/arrow-down.svg`
    hideButtonImg.alt = ''
    return hideButtonImg
  }

  const toggleVisibility = (table) => {
    const tableRows = table.querySelectorAll('thead, tbody')
    tableRows.forEach((row) => row.classList.toggle('hide'))
  }

  getAllTables().forEach((table) => {
    if (!isNestedTable(table)) {
      if (!contains(panels, table)) addMobileHiddenButton(table)
    } else table.classList.add('nested')
    addDataHeaders(table)
  })
  handleTableColumns(getAllTableColumns())
})()
