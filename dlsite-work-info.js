var DLsiteWorkInfo = function () {
  var GetDLsiteStringButton = $("<input type='button' value='Get DLsite String' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis'>")
  var GetInfoTableButton = $("<input type='button' value='Get InfoTable' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis'>")
  var GetBeautifiedInfoTableButton = $("<input type='button' value='Get Beautified InfoTable' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis'>")

  var SearchField = $("<input type='search' placeholder='Jump to work... (ID)' style='margin-left:10px;width:150px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis'>")

  var GetCategory = function () {
    var exp = new RegExp('http://www\.dlsite\.com/([a-zA-Z]*)/(work|announce)/=.*')
    var r = window.location.href.match(exp)
    return unescape(r[1])
  }

  var GetMakerId = function () {
    var result = null
    var makerInfoElem = $('#work_maker > tbody')
    makerInfoElem.children().each(
      function () {
        var elem = $(this)
        var title = elem.children('th')
        var value = elem.children('td')
        if ($.inArray(title.text(), ['サークル名', 'ブランド名']) != -1) {
          var exp = new RegExp('http://www\.dlsite\.com/(maniax|pro|books|nijiyome)/circle/profile/=/maker_id/(.*)$')
          var url = value.children('span.maker_name').children('a').attr('href')
          if (url == null) {
            url = $('#topicpath > a:nth-child(2) > span').text()
          }
          var r = url.match(exp)
          if (r != null) {
            result = unescape(r[2]).replace('/', '').replace('.html', '')
          }
        }
      }
    )
    return result
  }

  var GetWorkId = function () {
    var exp = new RegExp('http://www\.dlsite\.com/(maniax|pro|books|nijiyome)/(work|announce)/=/product_id/(.*)$')
    var r = window.location.href.match(exp)
    return unescape(r[3]).replace('/', '').replace('.html', '')
  }

  var WorkIsPublished = function () {
    var exp = new RegExp('http://www\.dlsite\.com/(maniax|pro|books|nijiyome)/(work|announce)/.*')
    var r = window.location.href.match(exp)
    return unescape(r[2]) == 'work'
  }

  var GetWorkInfo = function () {
    var result = {}
    result.maker = {
      'id': GetMakerId()
    }
    result.work = {
      'id': GetWorkId(),
      'name': $('#work_name > a').text().substr(1),
      'url': $('#work_name > a').attr('href'),
      'published': WorkIsPublished()
    }
    if ($.inArray(result.work.name.substr(0, 8), ['DLsite専売', 'DLsite独占']) != -1) {
      result.work.name = result.work.name.substr(8)
    }
    result.category = GetCategory()
    var makerInfoElem = $('#work_maker > tbody')
    makerInfoElem.children().each(
      function () {
        var elem = $(this)
        var title = elem.children('th')
        var value = elem.children('td')
        if ($.inArray(title.text(), ['サークル名', 'ブランド名']) != -1) {
          result.maker.name = value.children('span.maker_name').text()
          result.maker.url = value.children('span.maker_name').children('a').attr('href')
        } else if (title.text() == 'ホームページ') {
          result.maker.homepage = value.children('a').attr('href')
        }
      }
    )
    var workElem = $('#work_outline > tbody')
    workElem.children().each(
      function () {
        var elem = $(this)
        var title = elem.children('th')
        var value = elem.children('td')
        if (title.text() == '販売日') {
          var dateString = value.children('a').text()
          var year = dateString.substr(0, 4)
          var month = dateString.substr(5, 2)
          var date = dateString.substr(8, 2)
          result.work.saleDate = year + '-' + month + '-' + date
        } else if (title.text() == '最終更新日') {
          var dateString = value.text()
          var year = dateString.substr(0, 4)
          var month = dateString.substr(5, 2)
          var date = dateString.substr(8, 2)
          result.work.lastUpdateDate = year + '-' + month + '-' + date
        } else if (title.text() == '年齢指定') {
          result.work.ageProvision = value.children('div').children('a').children('span').text()
        } else if (title.text() == '作品形式') {
          result.work.workForms = []
          var workFormElem = value.children('div')
          workFormElem.children().each(
            function () {
              var elem = $(this)
              result.work.workForms.push(elem.children('span').text())
            }
          )
          var exp = new RegExp('.*</span></a>&nbsp;/&nbsp;([^<>]*)$')
          var r = workFormElem.html().match(exp)
          if (r != null) {
            result.work.workForms.push(unescape(r[1]))
          }
        } else if (title.text() == 'ファイル形式') {
          result.work.fileForms = []
          var fileFormElem = value.children('div')
          fileFormElem.children().each(
            function () {
              var elem = $(this)
              result.work.fileForms.push(elem.children('span').text())
            }
          )
        } else if (title.text() == 'その他') {
          result.work.otherGenres = []
          var otherGenresElem = value.children('div')
          otherGenresElem.children().each(
            function () {
              var elem = $(this)
              result.work.otherGenres.push(elem.children('span').text())
            }
          )
        } else if (title.text() == 'ジャンル') {
          result.work.mainGenres = []
          var mainGenresElem = value.children('div')
          mainGenresElem.children().each(
            function () {
              var elem = $(this)
              if (elem.is('a')) {
                result.work.mainGenres.push(elem.text())
              }
            }
          )
        }
      }
    )
    return result
  }

  GetDLsiteStringButton.click(
    function () {
      var anyOf_inArray = function (arrayA, arrayB) {
        var result = false
        for (var i = 0; i < arrayA.length; ++i) {
          if ($.inArray(arrayA[i], arrayB) != -1) {
            result = true
          }
        }
        return result
      }
      var info = GetWorkInfo()
      // Calculate form.
      var form = ''
      if (anyOf_inArray(['ムービーファイル', 'ムービー(AVI)', 'ムービー(WMV)', 'ムービー(MPEG)'], info.work.fileForms)) {
        form = 'アニメ'
      } else if (anyOf_inArray(['アプリケーション', 'Flash', 'HTML(+動画)'], info.work.fileForms)) {
        form = $.inArray('動画作品', info.work.workForms) != -1 ? 'アニメゲーム' : 'ゲーム'
      } else if (anyOf_inArray(['アドベンチャーゲーム'], info.work.workForms)) {
        form = 'ゲーム'
      } else if (anyOf_inArray(['画像(BMP)', '画像(JPEG)', '画像(PNG)', 'HTML(+Flash)', 'HTML(+画像)'], info.work.fileForms)) {
        if (anyOf_inArray(['イラスト(CG)+ノベル', 'イラスト集(CG集)'], info.work.workForms) != -1) {
          form = 'CG集'
        }
      } else if (anyOf_inArray(['オーディオ(MP3)', 'オーディオ(WAV)'], info.work.fileForms) && $.inArray('音声作品', info.work.workForms) != -1) {
        form = '音声'
      } else if (anyOf_inArray(['マンガ'], info.work.workForms)) {
        form = 'コミック'
      } else if ($.inArray('その他', info.work.workForms) != -1) {
        form = info.work.workForms[1]
      }
      // Concat result.
      var result = '('
      + (info.category == 'maniax' ? '同人' : info.work.ageProvision) + form + ') ['
      + info.work[info.work.published ? 'saleDate' : 'lastUpdateDate'].substr(2).split('-').join('') + '] ['
      + info.work.id + '] [' + info.maker.name + '] ' + info.work.name
      // window.copy(result)
      var elem = $('<textarea/>')
      elem.text(result)
      $('body').append(elem)
      elem.select()
      document.execCommand('copy')
      elem.remove()
      alert('Following texts have been copied to your clipboard:\n\n' + result)
    }
  )

  GetInfoTableButton.click(
    function () {
      var info = GetWorkInfo()
      var result = JSON.stringify(info)
      // window.copy(result)
      var elem = $('<textarea/>')
      elem.text(result)
      $('body').append(elem)
      elem.select()
      document.execCommand('copy')
      elem.remove()
      alert('Following texts have been copied to your clipboard:\n\n' + result)
    }
  )

  GetBeautifiedInfoTableButton.click(
    function () {
      var info = GetWorkInfo()
      var result = JSON.stringify(info, null, 2)
      // window.copy(result)
      var elem = $('<textarea/>')
      elem.text(result)
      $('body').append(elem)
      elem.select()
      document.execCommand('copy')
      elem.remove()
      alert('Following texts have been copied to your clipboard:\n\n' + result)
    }
  )

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
        exp = new RegExp('VJ[0-9]{6}')
        r = text.match(exp)
        if (r != null) {
          url = 'http://www.dlsite.com/pro/work/=/product_id/' + unescape(r[0]) + '.html'
        }
        if (url != null) {
          window.location.href = url
        }
      }
    }
  )

  $('#topicpath').append(GetDLsiteStringButton)
  $('#topicpath').append(GetInfoTableButton)
  $('#topicpath').append(GetBeautifiedInfoTableButton)
  $('#topicpath').append(SearchField)
}

DLsiteWorkInfo()
