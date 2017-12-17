var NyaaHelper = function () {

  var hashElem = $('body > div > div.panel.panel-success > div.panel-body > div:nth-child(5) > div.col-md-5 > kbd')
  var hash = hashElem.text()
  if (hash == '') {
    hashElem = $('body > div > div:nth-child(1) > div.panel-body > div:nth-child(5) > div.col-md-5 > kbd')
    hash = hashElem.text()
  }

  var magnetLinkElem = $('div.panel-footer.clearfix > a.card-footer-item > .fa-magnet').parent()
  var magnetLink = magnetLinkElem.attr('href')
  magnetLink = magnetLink.replace(/magnet:\?xt=urn:btih:([0-9]|[A-Z]){32}/, 'magnet:?xt=urn:btih:' + hash.toUpperCase())
  magnetLinkElem.attr('href', magnetLink)
  
  var iTorrentsLinkElem = $('<a href="http://itorrents.org/torrent/' + hash.toUpperCase() + '.torrent"><i class="fa fa-download fa-fw"></i>iTorrents</a>')
  var saveBTLinkElem = $('<a href="http://savebt.com/infohash/' + hash.toUpperCase() + '.html"><i class="fa fa-download fa-fw"></i>SaveBT</a>')

  var downloadArea = $('div.panel-footer.clearfix')
  downloadArea.append(' or ')
  downloadArea.append(iTorrentsLinkElem)
  downloadArea.append(' or ')
  downloadArea.append(saveBTLinkElem)

}

NyaaHelper()
