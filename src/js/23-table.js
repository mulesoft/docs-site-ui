(() => {
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
    getRows(table).forEach((tableRow) =>
      addDataHeader(tableRow, tableHeaderTexts)
    )
  }

  const addMobileHiddenButton = (table) => {
    const hideButtonSpan = document.createElement('span')
    hideButtonSpan.classList.add('table-toggle-row')
    table.insertBefore(hideButtonSpan, table.firstElementChild)

    const hideButton = getHideButton()
    if (hasCaption(table)) hideButton.classList.add('with-caption')
    hideButtonSpan.appendChild(hideButton)
  }

  const adjustMobileColumnWidth = (tableColumns, widthMap, e) => {
    if (e) e.preventDefault()
    tableColumns.forEach((col, index) => {
      setColWidth(col, isBigScreenSize() ? widthMap[index] : '100%')
    })
  }

  const getAllTableColumns = () =>
    document.querySelectorAll('table > colgroup > col')
  const getAllTables = () =>
    document.querySelectorAll('table:not(.connectors-table, div.admonitionblock table, table table)')

  // getDirectTableCells' implementation excludes the table cells from nested tables
  const getDirectTableCells = (tableRow) =>
    Array.from(tableRow.children).filter((child) => child.tagName === 'TD')
  const getRows = (table) => table.querySelectorAll('tr')

  const getHideButton = () => {
    const label = 'Click to toggle the table'

    const hideButton = document.createElement('button')
    hideButton.type = 'button'
    hideButton.className = 'table-toggle'
    hideButton.setAttribute('aria-expanded', false)
    hideButton.setAttribute('aria-label', label)
    hideButton.setAttribute('title', label)

    const hideButtonImg = getHideButtonImg()
    hideButton.appendChild(hideButtonImg)

    return hideButton
  }

  const getHideButtonImg = () => {
    const hideButtonImg = document.createElement('img')
    hideButtonImg.loading = 'lazy'
    const uiRootPath = document.getElementById('site-script').dataset.uiRootPath
    hideButtonImg.src = `${uiRootPath}/img/icons/arrow-down.svg`
    hideButtonImg.alt = ''
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
    window.addEventListener('resize', (e) =>
      adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap, e)
    )
  }

  const hasCaption = (table) => table.firstElementChild.tagName === 'CAPTION'
  const hasContent = (text) => text && text.length
  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

  const setColWidth = (col, width) => {
    col.style.width = width
  }

  getAllTables().forEach((table) => {
    addMobileHiddenButton(table)
    addDataHeaders(table)
  })
  handleTableColumns(getAllTableColumns())
})()
