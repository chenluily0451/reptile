/**
 * Created by chenlu on 2018/3/26.
 */

const superagent = require('superagent'),
    express = require('express'),
    router = express.Router(),
    cheerio= require('cheerio'),
    app = express(),
    path = require('path')

    app.set('views', path.join(__dirname, './src-web')); //设置views的目录,__dirname全局变量表示当前执行脚本所在的目录
    app.set('view engine', 'ejs');  //设置渲染引擎

    app.get('/',function(req,res,next){
        superagent.get('https://www.smzdm.com/')
            .end(function (err,r) {

                // 常规出错处理
                if(err){
                    return next(err)
                }

                // res.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                // 剩下就都是 jquery 的内容了

                const $ = cheerio.load(r.text),
                      items = []

                $('#feed-main-list li').each(function (idx, element) {
                    var $element = $(element);
                    items.push({
                        title: $element.find('a').text(),
                        href: $element.find('a').attr('href')
                    });
                })

                console.log(items)
                res.render('index', { items : items})

            })
    })


    // 定义端口号

    app.listen(3030, ()=>{
        console.log('打开http://localhost:3030/查看')
    })