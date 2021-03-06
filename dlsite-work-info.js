﻿var DLsiteWorkInfo = function () {

  var ToolBarA = $('<div id="dwi-toolbar-a"></div>')
  var ToolBarB = $('<div id="dwi-toolbar-b"></div>')
  var ButtonGroupA = $('<div style="display:inline"></div>')
  var ButtonGroupB = $('<div style="display:inline"></div>')
  var SearchByNyaaButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Nyaa</button>')
  var SearchByPantsuNyaaButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Pantsu Nyaa</button>')
  var SearchByAcgnXButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">AcgnX</button>')
  var SearchByGgbasesButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">GGBases</button>')
  var SearchByAnimeSharingButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Anime-Sharing</button>')
  var SearchByErokuniButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Erokuni</button>')
  var SearchBy2dkfButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">2DKF</button>')
  var SearchByTokyoToshokanButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Tokyo Toshokan</button>')
  var SearchByExHentaiButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">ExHentai</button>')
  var SearchByGoogleButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">Google</button>')
  var SearchByBtdbButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">BTDB</button>')
  var SearchBySoBaiduPanButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">SoBaiduPan</button>')
  var SearchBySagaozButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">SAGAO.Z</button>')
  var CopyWorkTitleButton = $('<button class="dwi-btn dwi-btn-yellow dwi-next-item">作品标题</button>')
  var CopyWorkIdButton = $('<button class="dwi-btn dwi-btn-yellow dwi-next-item">作品编号</button>')
  var CopyMakerNameButton = $('<button class="dwi-btn dwi-btn-yellow dwi-next-item">团体名</button>')
  var CopyDLsiteStringButton = $('<button class="dwi-btn dwi-btn-brown dwi-next-item">用于整理的字符串</button>')
  var CopyInfoTableButton = $('<button class="dwi-btn dwi-btn-green dwi-next-item">压缩的作品信息</button>')
  var CopyBeautifiedInfoTableButton = $('<button class="dwi-btn dwi-btn-purple dwi-next-item">格式化的作品信息</button>')
  var LocalWorkInfoButton = $('<button class="dwi-btn dwi-btn-gray dwi-next-item">本地副本</button>')

  var Submit = function (url, method, dict) {
    var form = $(`<form action="${url}" method="${method}" target="_blank"></form>`)
    var submitExists = false
    for (var key in dict) {
      if (dict[key] == null) {
        form.append($(`<input type="hidden" name="${key}">`))
      } else {
        if (key == 'submit') {
          submitExists = true
          form.append($(`<input id="dwi-form-submit-btn" type="hidden" name="submit" value="${dict[key]}">`))
        } else {
          form.append($(`<input type="hidden" name="${key}" value="${dict[key]}">`))
        }
      }
    }
    $('body').append(form)
    if (submitExists) {
      $('#dwi-form-submit-btn').click()
    } else {
      form.submit()
    }
    form.remove()
  }

  var GetCategory = function () {
    var exp = new RegExp('http(s?)://www\.dlsite\.com/([a-zA-Z]*)/(work|announce)/=.*')
    var r = window.location.href.match(exp)
    return unescape(r[2])
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
          var exp = new RegExp('http(s?)://www\.dlsite\.com/(maniax|pro|books|nijiyome|ecchi-eng)/circle/profile/=/maker_id/(.*)$')
          var url = value.children('span.maker_name').children('a').attr('href')
          if (url == null) {
            url = $('#topicpath > a:nth-child(2) > span').text()
          }
          var r = url.match(exp)
          if (r != null) {
            result = unescape(r[3]).split('#')[0].replace('/', '').replace('.html', '')
          }
        }
      }
    )
    return result
  }

  var GetWorkId = function () {
    var exp = new RegExp('http(s?)://www\.dlsite\.com/(maniax|pro|books|nijiyome|ecchi-eng|home)/(work|announce)/=/product_id/(.*)$')
    var url = $('#work_name > a').attr('href')
    if (url == null) {
      var url = window.location.href
    }
    var r = url.match(exp)
    return unescape(r[4]).split('#')[0].replace('/', '').replace('.html', '')
  }

  var WorkIsPublished = function () {
    var exp = new RegExp('http(s?)://www\.dlsite\.com/(maniax|pro|books|nijiyome|ecchi-eng|home)/(work|announce)/.*')
    var r = window.location.href.match(exp)
    return unescape(r[3]) == 'work'
  }

  var GetWorkInfo = function () {
    var result = {}
    result.maker = {
      'id': GetMakerId()
    }
    result.work = {
      'id': GetWorkId(),
      'name': $('#work_name > a > span').text(),
      'url': $('#work_name > a').attr('href'),
      'published': WorkIsPublished()
    }
    if (result.work.name == '') {
      result.work.name = $('#work_name > a').text()
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
          result.work.saleDate = Utility.ConvertDateFormat_0(dateString)
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
              var form = elem.text()
              result.work.workForms.push(form)
            }
          )
          var exp = new RegExp('.*</span></a>&nbsp;/&nbsp;([^<>]*)$')
          var r = workFormElem.html().match(exp)
          if (r != null) {
            result.work.workForms = result.work.workForms.concat(unescape(r[1])
              .split('/')
              .map(s => s.trim())
              .filter(s => s.length > 0))
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

  CopyWorkIdButton.click(
    function () {
      var info = GetWorkInfo()
      Utility.SetTextToClipboard(info.work.id)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyWorkTitleButton.click(
    function () {
      var info = GetWorkInfo()
      Utility.SetTextToClipboard(info.work.name)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyMakerNameButton.click(
    function () {
      var info = GetWorkInfo();
      Utility.SetTextToClipboard(info.maker.name)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyDLsiteStringButton.click(
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
      var ageProvision = info.category == 'maniax' ?
        (info.work.ageProvision == '18禁' ? '同人' : '一般') :
        info.work.ageProvision
      var form = ''
      if (anyOf_inArray(['ムービーファイル', 'ムービー', 'ムービー(AVI)', 'ムービー(WMV)', 'ムービー(MPEG)', 'ムービー(MP4)', 'AVI', 'WMV', 'MPEG', 'MP4', 'WMV形式プレイムービー'], info.work.fileForms)
        || anyOf_inArray(['WMV形式'], info.work.workForms)) {
        form = 'アニメ'
      } else if (anyOf_inArray(['アプリケーション', 'EXE同梱', 'Flash', 'HTML(+動画)', 'HTML(+Flash)', 'HTML(Flash)', 'HTML(動画)'], info.work.fileForms)) {
        form = anyOf_inArray(['動画作品', '動画'], info.work.workForms) ? 'アニメゲーム' : 'ゲーム'
      } else if (anyOf_inArray(['アドベンチャーゲーム', 'シミュレーションゲーム', 'アドベンチャー', 'ロールプレイング', 'シューティング', 'パズル', 'タイピング', 'クイズ', 'テーブル'], info.work.workForms)) {
        form = 'ゲーム'
      } else if (anyOf_inArray(['CG・イラスト', '画像ファイル', '画像(BMP)', '画像(JPEG)', '画像(PNG)', 'HTML(+Flash)', 'HTML(+画像)', 'HTML+画像', 'PDF', 'BMP', 'JPEG', 'PNG', '専用ビューア'], info.work.fileForms) && anyOf_inArray(['イラスト+ノベル', 'イラスト(CG)+ノベル', 'イラスト集(CG集)', 'イラスト集', 'CG+ノベル', 'CG集', 'CG・イラスト', ''], info.work.workForms)) {
        form = 'CG集'
      } else if (anyOf_inArray(['オーディオ', 'オーディオ(MP3)', 'オーディオ(WAV)', 'オーディオ(FLAC)', 'MP3', 'WAV', 'FLAC'], info.work.fileForms) && anyOf_inArray(['音声作品', '音声'], info.work.workForms)) {
        form = '音声'
      } else if (anyOf_inArray(['音楽'], info.work.workForms)) {
        form = '音楽'
      } else if (anyOf_inArray(['マンガ', 'デジタルコミック', '単話',  '単行本', '雑誌/アンソロ'], info.work.workForms)) {
        form = 'コミック'
        if (info.work.ageProvision == '18禁') {
          ageProvision = '成年'
        }
      } else if ($.inArray('その他', info.work.workForms) != -1) {
        form = info.work.workForms[1]
      }
      // Concat result.
      var result = '('
        + ageProvision + form + ') ['
        + Utility.ConvertDateFormat_1(info.work[info.work.published ? 'saleDate' : 'lastUpdateDate']) + '] ['
        + info.work.id + '] [' + info.maker.name + '] ' + info.work.name
      result = result.toFileNameFormat()
      result = result
        .split('(モーションコミック版)')
        .join('（モーションコミック版）') // For サークル「survive」, will be changed to more generalized implementation in the future
      Utility.SetTextToClipboard(result)
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyInfoTableButton.click(
    function () {
      var info = GetWorkInfo()
      Utility.SetTextToClipboard(JSON.stringify(info))
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  CopyBeautifiedInfoTableButton.click(
    function () {
      var info = GetWorkInfo()
      Utility.SetTextToClipboard(JSON.stringify(info, null, 2))
      layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
    }
  )

  SearchByNyaaButton.click(
    function () {
      var info = GetWorkInfo()
      var name = info.work.name
        .split('\\').join('\\\\')
        .split('|').join('\\|')
        .split('-').join('\\-')
      var url = 'https://sukebei.nyaa.si/?q=' + encodeURIComponent(info.work.id + '|' + name) + '&f=0&c=1_0'
      window.open(url)
    }
  )

  SearchByPantsuNyaaButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://sukeibei.pantsu.cat/search?q=' + encodeURIComponent(info.work.name)
      window.open(url)
    }
  )

  SearchByAcgnXButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://www.acgnx.se/search.php?keyword=' + encodeURIComponent(info.work.name)
      window.open(url)
    }
  )

  SearchByGgbasesButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://ggbases.com/search.so?p=0&title=' + encodeURIComponent(info.work.name)
      window.open(url)
    }
  )

  SearchByAnimeSharingButton.click(
    function () {
      var info = GetWorkInfo()
      var name = info.work.name
        .split('\\').join('\\\\')
        .split('|').join('\\|')
        .split('-').join('\\-')
        .split('!').join('\\!')
        .split('@').join('\\@')
        .split('+').join('\\+')
      Submit('http://www.anime-sharing.com/forum/search.php?do=process', 'post', {
        'securitytoken': 'guest',
        'sortby': 'relevance',
        'order': 'descending',
        'do': 'process',
        'query': name
      })
    }
  )

  SearchByErokuniButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'http://dou.erokuni.net/?s=' + encodeURIComponent(info.work.name) + '&submit=Search'
      window.open(url)
    }
  )

  SearchBy2dkfButton.click(
    function () {
      var info = GetWorkInfo()
      Submit('http://bbs.2dkf.com/search.php?', 'post', {
        'step': '2',
        'method': 'AND',
        'sch_area': '0',
        's_type': 'forum',
        'f_fid': 'all',
        'orderway': 'lastpost',
        'asc': 'DESC',
        'keyword': info.work.name,
        'submit': '搜索帖子'
      })
    }
  ) // Illegal operation

  SearchByTokyoToshokanButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://www.tokyotosho.info/search.php?terms=' + encodeURIComponent(info.work.name) + '&type=0'
      window.open(url)
    }
  )

  SearchByExHentaiButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://exhentai.org/?f_doujinshi=1&f_manga=1&f_artistcg=1&f_gamecg=1&f_western=1&f_non-h=1&f_imageset=1&f_cosplay=1&f_asianporn=1&f_misc=1&f_search=' + encodeURIComponent(info.work.name) + '&f_apply=Apply+Filter'
      window.open(url)
    }
  )

  SearchByGoogleButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://www.google.com/search?q=' + encodeURIComponent(info.work.name)
      window.open(url)
    }
  )

  SearchByBtdbButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://btdb.to/q/' + encodeURIComponent(info.work.name) + '/'
      window.open(url)
    }
  )

  SearchBySoBaiduPanButton.click(
    function () {
      var info = GetWorkInfo()
      Submit('http://www.sobaidupan.com/search.asp', 'get', {
        'wd': info.work.name,
        'so_md5key': '0cdb7d595f5a75a833c4b4c7f82bd7dc'
      })
    }
  )

  SearchBySagaozButton.click(
    function () {
      var info = GetWorkInfo()
      var url = 'https://cse.google.com/cse?cx=012651433025623183987%3Akkiu8qzvx58&q=' + encodeURIComponent(info.work.name)
      window.open(url)
    }
  )

  LocalWorkInfoButton.click(
    function () {
      var id = GetWorkInfo().work.id
      var elem = $(this)
      var db = openDatabase('DLsiteWorkInfo', '1.0', 'DLsite plugin local storage', 1024 * 1024 * 1024)
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM storage WHERE WORK_SN=?', [id], function (tx, rs) {
          if (rs.rows.length == 0) {
            layer.tips('未发现本地副本', elem, { time: 1000 })
          } else {
            var paths = rs.rows[0].PATH
            for (var i = 1; i < rs.rows.length; ++i) {
              paths += `\n${rs.rows[i].PATH}`
            }
            Utility.SetTextToClipboard(paths)
            layer.tips(`发现了${rs.rows.length}个本地副本<br>已将路径复制到剪贴板`, elem, { time: 1000 })
          }
          return false
        })
      })
    }
  )
  
  layer.config({
    anim: 5,
    time: 0,
    tips: [3, 'rgba(0,0,0)']
  })
  
  $('#top_wrapper > .topicpath').append(ToolBarA)
  $('#work_name > a').after(ToolBarB)
  ToolBarA.append(ButtonGroupA)
  ToolBarB.append(ButtonGroupB)
  ButtonGroupA.append(SearchByNyaaButton)
  // ButtonGroupA.append(SearchByPantsuNyaaButton)
  // ButtonGroupA.append(SearchByAcgnXButton)
  ButtonGroupA.append(SearchByGgbasesButton)
  ButtonGroupA.append(SearchByAnimeSharingButton)
  ButtonGroupA.append(SearchByErokuniButton)
  // ButtonGroupA.append(SearchBy2dkfButton)
  // ButtonGroupA.append(SearchByTokyoToshokanButton)
  ButtonGroupA.append(SearchByExHentaiButton)
  ButtonGroupA.append(SearchByGoogleButton)
  ButtonGroupA.append(SearchByBtdbButton)
  // ButtonGroupA.append(SearchBySoBaiduPanButton)
  ButtonGroupA.append(SearchBySagaozButton)
  ButtonGroupB.append(CopyWorkIdButton)
  ButtonGroupB.append(CopyWorkTitleButton)
  ButtonGroupB.append(CopyMakerNameButton)
  ButtonGroupB.append(CopyDLsiteStringButton)
  ButtonGroupB.append(CopyInfoTableButton)
  ButtonGroupB.append(CopyBeautifiedInfoTableButton)
  ButtonGroupB.append(LocalWorkInfoButton)

  // $('#top_wrapper').css('margin-top', '0')
  // $('#topicpath').css('display', 'inline')
  // $('#top_wrapper > div.base_title_br.clearfix').css('margin-top', '5px')
  $('#work_name > a').css('display', 'inline')

}

DLsiteWorkInfo()
