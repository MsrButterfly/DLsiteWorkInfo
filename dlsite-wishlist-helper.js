var DLsiteWishlistHelper = function () {

  var GroupingButton = $('<button id="dwi-grouping-btn" class="dwi-btn dwi-btn-gray dwi-next-item">自动分组</button>')
  var ClearButton = $('<button id="dwi-grouping-btn" class="dwi-btn dwi-btn-brown dwi-next-item">删除已下载项目</button>')

  var ToolBar = $('#main_inner > div.base_title')

  ToolBar.append(GroupingButton)
  ToolBar.append(ClearButton)

  function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  GroupingButton.click(
    async function () {
      var table = $('#wishlist_work > table > tbody')
      var items = table.children('._favorite_item')
      for (var i = 0; i < items.length; ++i) {
        var item = $(items[i])
        if (item.css('display') == 'none') {
          continue
        }
        var genresNode = item.find('dd.work_genre')
        var genres = []
        genresNode.children('span').each(
          function () {
            var genre = $(this)
            genres.push(genre.text())
          }
        )
        genres.push(item.find('div.work_thumb').text().trim())  // category (2018.07.24)
        console.log(genres)
        var is = function (genre) {
          return $.inArray(genre, genres) != -1
        }
        var group = ''
        if (is('同人ゲーム') || is('アプリケーション') || is('ロールプレイング') || is('シミュレーション') || is('アドベンチャー') || is('アクション') || is('デジタルノベル') || is('シューティング') || is('パズル') || is('タイピング') || is('Flash') || is('HTML(Flash)') || is('その他ゲーム')) {
          group = 'ゲーム'
        } else if (is('CG集') || is('マンガ') || is('同人誌') || is('イラスト集') || is('CG・イラスト') || is('CG+ノベル') || is('デジタルコミック') || is('単話') || (is('3DCG') && !is('動画'))) {
          group = 'マンガ & CG集'
        } else if (is('動画')) {
          group = '動画'
        } else if (is('音声')) {
          group = '音声'
        } else if (is('音楽')) {
          group = '音楽'
        } else if (is('ノベル')) {
          group = 'ノベル'
        }
        if (is('全年齢') || is('R-15')) {
          group += ' (一般)'
        } else {
          group += ' (R-18)'
        }
        if (is('ツール/アクセサリ')) {
          group = 'ツール'
        } else if (is('画像素材') || is('音素材')) {
          group = '素材'
        }
        console.log('group = ' + group)
        var openFolderListButton = item.find('td.operation_area > ul > li:nth-child(1) > input.folder_move')
        var folderList = item.find('td.operation_area > div > div.folder > ul')
        var moveButton = item.find('td.operation_area > div > div.btn > input.move')
        folderList.children().each(
          function () {
            var folder = $(this)
            if (folder.text() == group) {
              openFolderListButton.click()
              folder.click()
              moveButton.click()
            }
          }
        )
        await Sleep(50)
      }
    }
  )

  ClearButton.click(
    async function () {
      var db = openDatabase('DLsiteWorkInfo', '1.0', 'DLsite plugin local storage', 1024 * 1024 * 1024)
      var table = $('#wishlist_work > table > tbody')
      var items = table.children('._favorite_item')
      for (var i = 0; i < items.length; ++i) {
        var item = $(items[i])
        if (item.css('display') == 'none') {
          continue
        }
        var id = item.find('.__product_attributes').attr('id').substr(1)
        var deleteButton = item.find('.operation_area > ul > li > div.delete > i');
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM storage WHERE WORK_SN=?', [id], function (tx, rs) {
            if (rs.rows.length > 0) {
              deleteButton.click();
              console.log(`delete ${id}`)
            }
            return false
          })
        })
        await Sleep(50)
      }
    }
  )

}

DLsiteWishlistHelper()
