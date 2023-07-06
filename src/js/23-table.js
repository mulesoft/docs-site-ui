;(() => {
  'use strict'

  const addDataHeader = (tableRow, headerTexts) => {
    const tableCells = getDirectTableCells(tableRow)
    tableCells.forEach((tableCell, indexNum) => {
      const headerText = headerTexts[indexNum]
      if (hasContent(headerText)) tableCell.setAttribute('data-header', headerText)
    })
  }

  const addDataHeaders = (table) => {
    const tableHeaderTexts = getTableHeaderTexts(table)
    getRows(table).forEach((tableRow) => addDataHeader(tableRow, tableHeaderTexts))
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

  const getAllTableColumns = () => document.querySelectorAll('table > colgroup > col')
  const getAllTables = () =>
    document.querySelectorAll('table:not(.connectors-table, div.admonitionblock table, table table)')

  // getDirectTableCells' implementation excludes the table cells from nested tables
  const getDirectTableCells = (tableRow) => Array.from(tableRow.children).filter((child) => child.tagName === 'TD')
  const getRows = (table) => table.querySelectorAll('tr')

  const getHideButton = () => {
    let hideButton = document.createElement('button')
    hideButton = setHideButtonAttributes(hideButton)

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

  const getTableHeaderTexts = (table) => {
    const tableHeaders = Array.from(table.querySelectorAll('th'))
    return tableHeaders.map((node) => node.innerText)
  }

  const handleTableColumns = (tableColumns) => {
    const tableColumnsWidthMap = getTableColumnsWidthMap(tableColumns)
    adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap)
    window.addEventListener('resize', (e) => adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap, e))
  }

  const handleToggle = (hideButton) => {
    const ariaExpandedValue = hideButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    hideButton.setAttribute('aria-expanded', ariaExpandedValue)
    hideButton.classList.toggle('flip-vertical')
  }

  const hasContent = (text) => text && text.length
  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

  const setColWidth = (col, width) => {
    col.style.width = width
  }

  const setHideButtonAttributes = (hideButton) => {
    const label = 'Click to toggle the table'

    hideButton.classList.add('table-toggle')
    hideButton.classList.add('flip-vertical')
    hideButton.setAttribute('aria-expanded', false)
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
    addMobileHiddenButton(table)
    addDataHeaders(table)
  })
  handleTableColumns(getAllTableColumns())
})()
