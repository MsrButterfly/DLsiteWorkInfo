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

  return this

}()
