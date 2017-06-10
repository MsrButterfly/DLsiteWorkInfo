var NyaaHelper = function () {
  var hashElem = $('body > div > div.panel.panel-success > div.panel-body > div:nth-child(5) > div.col-md-5 > kbd')
  var hash = hashElem.text()
  if (hash == '') {
    hashElem = $('body > div > div:nth-child(1) > div.panel-body > div:nth-child(5) > div.col-md-5 > kbd')
    hash = hashElem.text()
  }
  var linkElem = $('<a class="nh-link" href="http://savebt.com/infohash/' + hash.toUpperCase() + '.html">' + hash + '</a>')
  hashElem.text('')
  hashElem.append(linkElem)
}

NyaaHelper()
