var SurugayaWorkInfo = () => {

  var ToolBar = $('<div id="swi-toolbar-a"></div>')
  var CopyWorkIdButton = $('<button>作品编号</button>')
  var CopyWorkTitleButton = $('<button>作品标题</button>')
  var CopyMakerNameButton = $('<button>制作者</button>')
  var CopySurugayaStringButton = $('<button>用于整理的字符串</button>')
  var CopyInfoTableButton = $('<button>压缩的作品信息</button>')
  var CopyBeautifiedInfoTableButton = $('<button>格式化的作品信息</button>')

  var Types = {
    'CG集': ['同人CG CDソフト'],
    '音楽': ['同人音楽CDソフト']
  }

  var TypeMap = {}
  $.each(Types, (k, vs) => vs.forEach(v => TypeMap[v] = k))

  var GetWorkInfo = () => {
    var raw = {}
    $('#configurations > tbody > tr > td.divider')
      .each((i, e) => {
        var item = $(e)
        var key = item.text().trim()
        var value = item.next().text().trim()
        if (value === '-') {
          value = undefined
        }
        raw[key] = value
      })
    var title = $('#title > h2').text().trim()
    var type = $('#category > table > tbody > tr > td').text().trim()
    return {
      'id': raw['管理番号'],
      'jan': raw['JAN'],
      'modelId': raw['型番'],
      'title': title,
      'type': type,
      'releaseDate': Utility.ConvertDateFormat_0(raw['発売日']),
      'price': raw['定価'],
      'maker': raw['メーカー'],
      'appearance': raw['出演']
    }
  }

  CopyWorkIdButton.click(() => {
    var info = GetWorkInfo()
    Utility.SetTextToClipboard(info.id)
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  CopyWorkTitleButton.click(() => {
    var info = GetWorkInfo()
    Utility.SetTextToClipboard(info.title)
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  CopyMakerNameButton.click(() => {
    var info = GetWorkInfo()
    Utility.SetTextToClipboard(info.maker)
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  CopySurugayaStringButton.click(() => {
    var info = GetWorkInfo()
    var type = TypeMap[info.type]
    var date = Utility.ConvertDateFormat_1(info.releaseDate)
    var id = info.id
    var circle = info.maker
    var title = info.title
    var ret = `(同人${type}) [${date}] [srgy${id}] [${circle}] ${title}`.toFileNameFormat()
    Utility.SetTextToClipboard(ret)
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  CopyInfoTableButton.click(() => { 
    var info = GetWorkInfo()
    Utility.SetTextToClipboard(JSON.stringify(info))
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  CopyBeautifiedInfoTableButton.click(() => {
    var info = GetWorkInfo()
    Utility.SetTextToClipboard(JSON.stringify(info, null, 2))
    layer.tips('文本已被复制到剪贴板', $(this), { time: 1000 })
  })

  layer.config({
    anim: 5,
    time: 0,
    tips: [3, 'rgba(0,0,0)']
  })

  $('#tabbed').after(ToolBar)
  ToolBar.append(CopyWorkIdButton)
  ToolBar.append(CopyWorkTitleButton)
  ToolBar.append(CopyMakerNameButton)
  ToolBar.append(CopySurugayaStringButton)
  ToolBar.append(CopyInfoTableButton)
  ToolBar.append(CopyBeautifiedInfoTableButton)

}

SurugayaWorkInfo()
