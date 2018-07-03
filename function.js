$.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    method: 'get',
    dataType: 'json',
    data: {
        rss_url: 'https://inbound.digifianz.com/academy/rss.xml'
    }
}).done(function (response) {
    if(response.status != 'ok') { 
        throw response.message 
    }
    
    $('#title').append(response.feed.title)

    for(var i in response.items) {
        var item = response.items[i]

        if(i < 6) {                    
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
                '<article class="item">'
                + '<div class="header">'
                + '<img class="thumbnail" src="'+ item.thumbnail +'">'
                + '</div>'
                + '<div class="content">'
                + '<h3 class="post-title">' + item.title + '</h3>'
                + '<div class="text">' + trimmedString + '...</div>'
                + '<a class="btn" href="' + item.link + '" target="_blank">Leer Más</a>'
                + '</div>'
                + '</article>'
            )  
        }
    }
})