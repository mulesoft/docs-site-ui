;(() => {
  'use strict'

  const addDataHeader = (tableRow, headerTexts) => {
    const tableCells = tableRow.querySelectorAll('td')
    tableCells.forEach((tableCell, indexNum) => {
      const headerText = headerTexts[indexNum]
      if (headerText?.length) tableCell.setAttribute('data-header', headerText)
    })
  }

  const addDataHeaders = (table) => {
    const tableHeaderTexts = getTableHeaderTexts(table)
    const tableRows = table.querySelectorAll('tr')
    tableRows.forEach((tableRow) => addDataHeader(tableRow, tableHeaderTexts))
  }

  const adjustMobileColumnWidth = (tableColumns, widthMap, e) => {
    if (e) e.preventDefault()
    tableColumns.forEach((col, index) => {
      const colWidth = isBigScreenSize() ? widthMap[index] : '100%'
      setColWidth(col, colWidth)
    })
  }

  const getTableColumnsWidthMap = (tableColumns) => {
    const columnsWidthMap = {}
    tableColumns.forEach((col, index) => {
      columnsWidthMap[index] = col.style.width
    })
    return columnsWidthMap
  }

  const getTableHeaderTexts = (table) => {
    const tableHeader = table.querySelectorAll('th')
    const tableHeaderArray = Array.from(tableHeader)
    return tableHeaderArray.map((node) => node.innerText)
  }

  const isBigScreenSize = () => window.matchMedia(' (min-width: 768px)').matches

  const setColWidth = (col, width) => {
    col.style.width = width
  }

  const tables = document.querySelectorAll('table')
  tables.forEach((table) => addDataHeaders(table))

  const tableColumns = document.querySelectorAll('table > colgroup > col')
  const tableColumnsWidthMap = getTableColumnsWidthMap(tableColumns)
  window.addEventListener('resize', (e) => adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap, e))
  adjustMobileColumnWidth(tableColumns, tableColumnsWidthMap)
})()
