htmlToJson = require('html-to-json')

function criarJSON(link, nameFile) {
    let fs = require('fs')
    let html = htmlToJson.request(link,
        {
            title: ['meta[property]', function ($meta) {
                if ($meta.attr('property').localeCompare('og:title') === 0)
                    return $meta.attr('content')
            }],
            author: ['meta[name]', function ($meta) {
                if ($meta.attr('name').localeCompare('author') === 0)
                    return $meta.attr('content')
            }],
            body: ['p', function ($p) {
                return $p.text().match(/[^\t]/g).join('') //.join('') transformar um array de string em string
            }],
            type: ['meta[property]', function ($meta) {
                if ($meta.attr('property').localeCompare('og:type') === 0)
                    return $meta.attr('content')
            }],
            url: ['meta[property]', function ($meta) {
                if ($meta.attr('property').localeCompare('og:url') === 0)
                    return $meta.attr('content')
            }]
        }, function (err, result) {
            if (err) {
                console.log('Erro: ' + err)
            }
            else {
                result.body = result.body.join('\n') //tratando o body
                result.title = result.title.join('')
                result.author = result.author.join('')
                result.type = result.type.join('')
                result.url = result.url.join('')
                let json = JSON.stringify(result)
                fs.writeFile(nameFile + '.json', json, 'utf8', (err) => console.log(err ? 'Erro:' + err : 'Sucess!'))
            }
        }
    )
}