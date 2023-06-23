;(() => {
  'use strict'

  const addDataHeader = (tableRow, headerTexts) => {
    const tableCells = tableRow.querySelectorAll('td')
    tableCells.forEach((tableCell, indexNum) => {
      const headerText = headerTexts[indexNum]
      if (headerText?.length) tableCell.setAttribute('data-header', headerText)
    })
  }

  const getTableHeaderTexts = (table) => {
    const tableHeader = table.querySelectorAll('th')
    const tableHeaderArray = Array.from(tableHeader)
    return tableHeaderArray.map((node) => node.innerText)
  }

  const tables = document.querySelectorAll('table')

  tables.forEach((table) => {
    const tableHeaderTexts = getTableHeaderTexts(table)
    const tableRows = table.querySelectorAll('tr')
    tableRows.forEach((tableRow) => {
      console.log(tableRow)
      addDataHeader(tableRow, tableHeaderTexts)
    })
  })
})()
