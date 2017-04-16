var DLsiteWorkInfo = function() {

    var GetDLsiteStringButton = $("<input type='button' id='get-dlsite-string-button' value='Get DLsite String' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>");
    var GetInfoTableButton = $("<input type='button' id='get-info-table-button' value='Get InfoTable' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>");
    var GetBeautifiedInfoTableButton = $("<input type='button' id='get-beautified-info-table-button' value='Get Beautified InfoTable' style='margin-left:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>");
    
    var GetCategory = function() {
        var exp = new RegExp('http://www\.dlsite\.com/([a-zA-Z]*)/work/=.*');
        var r = window.location.href.match(exp);
        return unescape(r[1]);
    }

    var GetWorkInfo = function () {
        var result = {};
        result['maker'] = {};
        result['work'] = {
            'id': $('#main_inner > div.work_article.work_spec > dl > dd:nth-child(2)').text(),
            'name': $('#work_name > a').text().substr(1),
            'url': $('#work_name > a').attr('href')
        };
        if (result['work']['name'].substr(0, 8) == 'DLsite専売') {
            result['work']['name'] = result['work']['name'].substr(8);
        }
        result['category'] = GetCategory();
        var makerInfoElem = $('#work_maker > tbody');
        makerInfoElem.children().each(
            function() {
                var elem = $(this);
                var title = elem.children('th');
                var value = elem.children('td');
                if ($.inArray(title.text(), ['サークル名', 'ブランド名']) != -1) {
                    result['maker']['name'] = value.children('span.maker_name').children('a').text();
                    result['maker']['url'] = value.children('span.maker_name').children('a').attr('href');
                } else if (title.text() == 'ホームページ') {
                    result['maker']['homepage'] = value.children('a').attr('href');
                }
            }
        );
        var workElem = $('#work_outline > tbody');
        workElem.children().each(
            function() {
                var elem = $(this);
                var title = elem.children('th');
                var value = elem.children('td');
                if (title.text() == '販売日') {
                    var dateString = value.children('a').text();
                    var year = dateString.substr(0, 4);
                    var month = dateString.substr(5, 2);
                    var date = dateString.substr(8, 2);
                    result['work']['sale date'] = year + '-' + month + '-' + date;
                } else if (title.text() == '年齢指定') {
                    result['work']['age provision'] = value.children('div').children('a').children('span').text();
                } else if (title.text() == '作品形式') {
                    result['work']['work forms'] = [];
                    var workFormElem = value.children('div');
                    workFormElem.children().each(
                        function() {
                            var elem = $(this);
                            result['work']['work forms'].push(elem.children('span').text());
                        }
                    )
                } else if (title.text() == 'ファイル形式') {
                    result['work']['file forms'] = [];
                    var fileFormElem = value.children('div');
                    fileFormElem.children().each(
                        function() {
                            var elem = $(this);
                            result['work']['file forms'].push(elem.children('span').text());
                        }
                    )
                } else if (title.text() == 'その他') {
                    result['work']['other genres'] = [];
                    var otherGenresElem = value.children('div');
                    otherGenresElem.children().each(
                        function() {
                            var elem = $(this);
                            result['work']['other genres'].push(elem.children('span').text());
                        }
                    )
                } else if (title.text() == 'ジャンル') {
                    result['work']['main genres'] = [];
                    var mainGenresElem = value.children('div');
                    mainGenresElem.children().each(
                        function() {
                            var elem = $(this);
                            if (elem.is('a')) {
                                result['work']['main genres'].push(elem.text());
                            }
                        }
                    )
                }
            }
        )
        return result;
    }
    
    GetDLsiteStringButton.click(
        function() {
            var anyOf_inArray = function (arrayA, arrayB) {
                var result = false;
                for (var i = 0; i < arrayA.length; ++i) {
                    if ($.inArray(arrayA[i], arrayB) != -1) {
                        result = true;
                    }
                }
                return result;
            }
            var info = GetWorkInfo();
            // Calculate form.
            var form = '';
            if (anyOf_inArray(['ムービー(WMV)', 'ムービー(MPEG)', 'HTML(+動画)'], info['work']['file forms'])) {
                form = 'アニメ';
            } else if (anyOf_inArray(['アプリケーション'], info['work']['file forms'])) {
                form = $.inArray('動画作品', info['work']['work forms']) != -1 ? 'アニメゲーム' : 'ゲーム';
            } else if (anyOf_inArray(['アドベンチャーゲーム'], info['work']['work forms'])) {
                form = 'ゲーム';
            } else if (anyOf_inArray(['画像(JPEG)', 'HTML(+Flash)'], info['work']['file forms'])) {
                if (anyOf_inArray(['イラスト(CG)+ノベル', 'イラスト集(CG集)'], info['work']['work forms']) != -1) {
                    form = 'CG集';
                }
            }
            // Concat result.
            var result = '(' + (info['category'] == 'maniax' ? '同人' : info['work']['age provision']) + form + ') [' + info['work']['sale date'].substr(2).split('-').join('') + '] [' + info['work']['id'] + '] [' + info['maker']['name'] + '] ' + info['work']['name'];
            // window.copy(result);
            var elem = $('<textarea/>');
            elem.text(result);
            $('body').append(elem);
            elem.select();
            document.execCommand('copy');
            elem.remove();
            alert('Following texts have been copied to your clipboard:\n\n' + result);
        }
    );

    GetInfoTableButton.click(
        function(){
            var info = GetWorkInfo();
            var result = JSON.stringify(info);
            // window.copy(result);
            var elem = $('<textarea/>');
            elem.text(result);
            $('body').append(elem);
            elem.select();
            document.execCommand('copy');
            elem.remove();
            alert('Following texts have been copied to your clipboard:\n\n' + result);
        }
    )

    GetBeautifiedInfoTableButton.click(
        function(){
            var info = GetWorkInfo();
            var result = JSON.stringify(info, null, 4);
            // window.copy(result);
            var elem = $('<textarea/>');
            elem.text(result);
            $('body').append(elem);
            elem.select();
            document.execCommand('copy');
            elem.remove();
            alert('Following texts have been copied to your clipboard:\n\n' + result);
        }
    )

    $('#topicpath').append(GetDLsiteStringButton);
    $('#topicpath').append(GetInfoTableButton);
    $('#topicpath').append(GetBeautifiedInfoTableButton);

};  

DLsiteWorkInfo();
