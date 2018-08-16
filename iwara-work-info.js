var IwaraHelper = function () {

  var BaseUrl = 'https://ecchi.iwara.tv'
  var VideoUri = '/videos'

  var ToolBar = $('div.node-buttons')
  var DownloadButton = $('#download-button')
  var CopyLocalStringButton = $('<button class="btn btn-info iwr-next-item">文件夹名</button>')
  var SearchField = $('<input id="iwr-search-field" type="search" placeholder="含有ID的字符串" class="form-control iwr-next-item">')
  var SearchWithClipboardContentButton = $('<button id="iwr-search-button" class="btn btn-success iwr-next-item">剪贴板</button>')

  var GetPureUrl = function () {
    var exp = new RegExp('(' + BaseUrl + VideoUri + '/[a-zA-Z0-9]+)[^a-zA-Z0-9]?.*$')
    var r = window.location.href.match(exp)
    return unescape(r[1])
  }

  var GetWorkId = function () {
    var exp = new RegExp('.*' + VideoUri + '/([a-zA-Z0-9]+)$')
    var url = GetPureUrl()
    var r = url.match(exp)
    return unescape(r[1])
  }

  var GetMakerName = function () {
    return $('.node-info > .submitted > a.username').text()
  }

  var GetDate = function () {
    var str = $('.node-info > .submitted').text()
    return new Date(Date.parse(str.split('作成日:').pop()))
  }
  
  var GetWorkInfo = function () {
    var result = {}
    result.maker = {
      'name': GetMakerName(),
      'url': BaseUrl + $('.node-info > .submitted > a.username').attr('href')
    }
    result.work = {
      'id': GetWorkId(),
      'name': $('h1.title').text(),
      'date': GetDate(),
      'url': GetPureUrl()
    }
    return result
  }

  CopyLocalStringButton.click(
    function () {
      var info = GetWorkInfo()
      var date = info.work.date
      var dateString =
        (date.getYear() % 100).pad(2) +
        (date.getMonth() + 1).pad(2) +
        date.getDate().pad(2)
      var result = '(同人アニメ) [' + dateString + '] [' + info.work.id + '] [' + info.maker.name + '] ' + info.work.name
      result = result.toFileNameFormat()
      Utility.SetTextToClipboard(result)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  SearchField.keypress(
    function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which)
      if (keycode == '13') {
        var text = SearchField.val()
        var url = null
        var exp = new RegExp('\\(同人アニメ\\) \\[[0-9]{6}\\] \\[([a-zA-Z0-9]{16,})\\] \\[.+\\] .+')
        var r = text.match(exp)
        if (r != null) {
          url = BaseUrl + VideoUri + '/' + unescape(r[1])
        }
        exp = new RegExp('[a-zA-Z0-9]{16,}')
        var r = text.match(exp)
        if (r != null) {
          url = BaseUrl + VideoUri + '/' + unescape(r[0])
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

  $('div.extra-content-block').remove()

  DownloadButton.after(CopyLocalStringButton)
  CopyLocalStringButton.after(SearchField)
  SearchField.after(SearchWithClipboardContentButton)

}

IwaraHelper()
