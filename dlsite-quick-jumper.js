var DLsiteQuickJumper = function () {

  var Bar = $('<div style="display:inline"></div>')
  var SearchField = $('<input id="dqj-search-field" type="search" placeholder="输入包含ID的字符串跳转到作品" class="dwi-next-item">')
  var SearchWithClipboardContentButton = $('<button id="dqj-search-button" class="dwi-btn dwi-btn-gray dwi-next-item">剪贴板</button>')

  SearchField.keypress(
    function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which)
      if (keycode == '13') {
        var text = SearchField.val()
        var url = null
        var exp = new RegExp('RJ[0-9]{6}')
        var r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/maniax/work/=/product_id/' + unescape(r[0]) + '.html'
        }
        exp = new RegExp('([0-9]{3})[A-Z]RJ([0-9]{3})')
        var r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/maniax/work/=/product_id/RJ' + unescape(r[1]) + unescape(r[2]) + '.html'
        }
        exp = new RegExp('VJ[0-9]{6}')
        r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/pro/work/=/product_id/' + unescape(r[0]) + '.html'
        }
        exp = new RegExp('RE[0-9]{6}')
        r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/ecchi-eng/work/=/product_id/' + unescape(r[0]) + '.html'
        }
        exp = new RegExp('BJ[0-9]{6}')
        r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/books/work/=/product_id/' + unescape(r[0]) + '.html'
        }
        if (url != null) {
          window.location.href = url
        } else {
          layer.tips('未发现作品ID', $(this), { time: 1000 })
        }
      }
    }
  )

  SearchWithClipboardContentButton.click(
    function (event) {
      SearchField.val('')
      SearchField.focus()
      document.execCommand('paste')
      var e = jQuery.Event('keypress');
      e.which = 13;
      SearchField.trigger(e)
    }
  )
  
  $('body > div.l-eisysGroupHeader.type-dlsite > div > ul.eisysGroupHeaderAccount').before(Bar)
  Bar.append(SearchWithClipboardContentButton)
  Bar.append(SearchField)

}

DLsiteQuickJumper()
