//爬取网站所有连接内容demo
import Crawler from 'js-crawler'

const filterUrl = function (url) {
    const onMainYahooSite = url.match(/^https?:\/\/[^\\/]*dytt8.net/) //只包含当前网站的连接

    if (onMainYahooSite) {
        console.log('电影天堂内部网址', url)
    }
    return onMainYahooSite
}

//用Crawler 获取网址所有网址
const foo = function () {
    const crawler = new Crawler().configure({ ignoreRelative: false, depth: 2 })

    crawler.crawl({
        url: 'http://www.dytt8.net/',
        success (page) {
            filterUrl(page.url)
        },
        failure (page) {
            console.log(page.status)
        },
        finished (crawledUrls) {
            console.log(crawledUrls)
        }
    })
}

export default foo

