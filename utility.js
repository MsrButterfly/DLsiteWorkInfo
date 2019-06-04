var Utility = function () {

  Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  }

  String.prototype.toFileNameFormat = function () {
    return this
      .split(' / ').join('／')
      .split('/').join('／')
      .split(' \\ ').join('＼')
      .split('\\').join('＼')
      .split(' | ').join('︱')
      .split('|').join('︱')
      .split('　').join(' ')
      .split(': ').join('：')
      .split(':').join('：')
      .split(' * ').join('﹡')
      .split('*').join('﹡')
      .split('? ').join('？')
      .split('?').join('？')
      .split('! ').join('！')
      .split('!').join('！')
      .split('"').join("''")
      .split(' <').join('〈')
      .split('<').join('〈')
      .split('> ').join('〉')
      .split('>').join('〉')
      .replace(/\.$/g, '．')
  }
  
  this.SetTextToClipboard = function (text) {
    // window.copy(result)
    var elem = $('<textarea/>')
    elem.text(text)
    $('body').append(elem)
    elem.select()
    document.execCommand('copy')
    elem.remove()
  }

  this.ConvertDateFormat_0 = function (dateString) {
    var year = dateString.substr(0, 4)
    var month = dateString.substr(5, 2)
    var date = dateString.substr(8, 2)
    return `${year}-${month}-${date}`
  }

  this.ConvertDateFormat_1 = function (dateString) {
    return dateString.substr(2).split(/\D/).join('')
  }

  return this

}()
