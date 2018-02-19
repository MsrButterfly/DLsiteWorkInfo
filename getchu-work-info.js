var GetchuHelper = function () {

  var BaseUrl = 'http://www.getchu.com'
  var WorkUri = "/soft.phtml"

  var WorkImageLink = $('#soft_table > tbody > tr:nth-child(1) > td > :nth-child(1)')
  var ToolBar = $('<div/>')
  var RelatedWorksButton = $('#soft-title > nobr > a')
  var CopyLocalStringButton = $('<button class="header_wish ui-default-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-affiliate gc-next-item">文件夹名</button>')
  var CopyWorkNameButton = $('<button class="header_wish ui-default-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-affiliate gc-next-item">作品名</button>')
  var SearchField = $('<input id="gc-search-field" type="search" placeholder="含有ID的字符串" class="form-control gc-next-item">')
  var SearchWithClipboardContentButton = $('<button id="gc-search-button" class="header_wish ui-default-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-affiliate gc-next-item">剪贴板</button>')
  var SearchBySagaozButton = $('<button class="header_wish ui-default-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary ui-affiliate gc-next-item">SAGAO.Z</button>')

  var GetPureUrl = function () {
    var exp = new RegExp('(' + BaseUrl + WorkUri + '\\?id=\\d+).*$')
    var r = window.location.href.match(exp)
    return unescape(r[1])
  }

  var GetWorkId = function () {
    var exp = new RegExp(BaseUrl + WorkUri + '\\?id=(\\d+).*$')
    var url = GetPureUrl()
    var r = url.match(exp)
    return unescape(r[1])
  }

  var GetWorkName = function () {
    var elem = $('#soft-title').clone()
    elem.children('nobr').remove()
    return elem.text().trim()
  }

  var GetMakerName = function () {
    var elem = $('#brandsite')
    if (elem.length == 0) {
      elem = $('#soft_table > tbody > tr:nth-child(2) > th > table > tbody > tr:nth-child(1) > td:nth-child(2)').clone()
      elem.children('nobr').remove()
    }
    return elem.text().trim()
  }

  var GetDate = function () {
    return new Date(Date.parse($('#tooltip-day').text()))
  }

  var GetWorkInfo = function () {
    var result = {}
    result.maker = {
      'name': GetMakerName(),
      'url': $('#brandsite').attr('href')
    }
    result.work = {
      'id': GetWorkId(),
      'name': GetWorkName(),
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
      var result = '(18禁ゲーム) [' + dateString + '] [gc' + info.work.id + '] [' + info.maker.name + '] ' + info.work.name
      result = result.toFileNameFormat()
      Utility.SetTextToClipboard(result)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyWorkNameButton.click(
    function () {
      Utility.SetTextToClipboard(GetWorkName())
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  SearchField.keypress(
    function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which)
      if (keycode == '13') {
        var text = SearchField.val()
        var url = null
        var exp = new RegExp('\\(18禁ゲーム\\) \\[\\d{6}\\] \\[gc(\\d+)\\] \\[.+\\] .+')
        var r = text.match(exp)
        if (r != null) {
          url = BaseUrl + WorkUri + '?id=' + unescape(r[1])
        }
        if (url != null) {
          window.location.href = url
        } else {
          layer.tips('未发现作品ID', $(this), {
            time: 1000,
            tips: 1
          })
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

  SearchBySagaozButton.click(
    function () {
      var url = 'https://cse.google.com/cse?cx=012651433025623183987%3Akkiu8qzvx58&q=' + encodeURIComponent(GetWorkName())
      window.open(url)
    }
  )

  layer.config({
    anim: 5,
    time: 0,
    tips: [1, 'rgba(0,0,0)']
  })

  $('#banner_a_mini1').parent().parent().parent().parent().remove()

  WorkImageLink.after(ToolBar)
  ToolBar.append(CopyLocalStringButton)
  ToolBar.append(CopyWorkNameButton)
  ToolBar.append(SearchField)
  ToolBar.append(SearchWithClipboardContentButton)
  ToolBar.append(SearchBySagaozButton)

}

GetchuHelper()
