(function () {
  var pre = document.getElementsByTagName('pre')
  for (var i = 0; i < pre.length; i++) {
    var b = document.createElement('button')
    b.className = 'clipboard'
    b.textContent = 'Copy'

    var parentDiv = pre[i].parentElement
    parentDiv.insertBefore(b, pre[i])
  }

  // new ClipboardJS('.clipboard', {
  //   target: function (b) {
  //     var p = b.parentNode
  //     return p.className.includes('highlight')
  //       ? p.getElementsByClassName('code')[0]
  //       : p.childNodes[0]
  //   },
  // }).on('success', function (e) {
  //   e.clearSelection()
  //   e.trigger.textContent = 'Copied'
  //   setTimeout(function () {
  //     e.trigger.textContent = 'Copy'
  //   }, 2000)
  // })
})()
