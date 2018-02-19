var DLsiteWishlistHelper = function () {

  var GroupingButton = $('<button id="dwi-grouping-btn" class="dwi-btn dwi-btn-gray dwi-next-item">自动分组</button>')

  $('#main_inner > div.base_title').append(GroupingButton)

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
        console.log(genres)
        var is = function (genre) {
          return $.inArray(genre, genres) != -1
        }
        var group = ''
        if (is('同人ゲーム') || is('アプリケーション') || is('シミュレーション') || is('アドベンチャー') || is('Flash')) {
          group = 'ゲーム'
        } else if (is('CG集') || is('マンガ') || is('同人誌') || is('イラスト集') || is('CG+ノベル') || is('デジタルコミック') || (is('3DCG') && !is('動画'))) {
          group = 'マンガ & CG集'
        } else if (is('動画')) {
          group = '動画'
        } else if (is('音声')) {
          group = '音声'
        } else if (is('音楽')) {
          group = '音楽'
        }
        if (is('18禁')) {
          group += ' (R-18)'
        } else {
          group += ' (一般)'
        }
        if (is('ツール/アクセサリ')) {
          group = 'ツール'
        } else if (is('画像素材') || is('音素材')) {
          group = '素材'
        }
        console.log('group = ' + group)
        var folderList = item.find('td.operation_area > div > div.folder > ul')
        var moveButton = item.find('td.operation_area > div > div.btn > input.move')
        folderList.children().each(
          function () {
            var folder = $(this)
            if (folder.text() == group) {
              folder.click()
              moveButton.click()
            }
          }
        )
        await Sleep(50)
      }
    }
  )

}

DLsiteWishlistHelper()
