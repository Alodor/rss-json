$.ajax({
            url: 'https://api.rss2json.com/v1/api.json',
            method: 'get',
            dataType: 'json',
            data: {
                rss_url: 'https://blog.parquedelrecuerdo.cl/tag/destacadas/rss.xml'
            }
        }).done(function (response) {
            if(response.status != 'ok') { 
                throw response.message 
            }
            
            for(var i in response.items) {
                var item = response.items[i]
                
                if(i < 3) {                    
                    var tagIndex = item.description.indexOf('<img')
                    var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex
                    var srcStart = srcIndex + 5
                    var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart
                    var src = item.description.substring(srcStart, srcEnd)
                    var yourString = item.description.replace(/<img[^>]*>/g,"")
                    var maxLength = 350
                    var trimmedString = yourString.substr(0, maxLength)
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))                    

                    $('#feed').append(
                        '<div class="item">'
                        + '<img src="'+ item.thumbnail +'">'
                        + '<h3 class="post-title">' + item.title + '</h3>'
                        + '<p>' + trimmedString + '...</p>'
                        + '<p><a href="' + item.link + '" target="_blank">Leer Más</a></p>'
                        + '<p>' + item.categories + '</p>'
                        + '</div>'
                    )  
                }
            }
        })