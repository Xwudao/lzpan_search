import { selector, getCategories, matchDomain, getSiteByAlias } from './js/func'
import { FAVICON_API_URL } from './core/constants'
import * as data from './data/data.json'



// doms
const yearDom = selector('#year')
const rightBar = $(".right-bar")
const rightMenus = rightBar.children('.menus')

const iframe = $('iframe[name="search"]')
const oLoading = $('#loading')
const err = $('#err')

const leftSiteList = $(".site-list")


// 处理顶部

let categories = getCategories(data.default)


function _genTop() {
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        let { title, alias } = element;

        let menu = $(`<li class="menu">
    <a href="#">网盘搜索</a>
    </li>`);

        let li = menu.children('li')
        let a = menu.children('li a')
        a.text(title)
        a.attr('data-alias', alias)

        // 添加事件，点击事件
        a.on('click', () => {

            menu.addClass('active').siblings().removeClass('active')
            _genLeft(alias)

        })
        rightMenus.append(menu)

        // 如果第一个的话，就默认选中
        if (index === 0) {
            menu.addClass('active').siblings().removeClass('active')
            _genLeft(alias)
        }
    }
}

// 处理左侧，生成左侧

function _genLeft(alias) {

    // 先清空左侧
    leftSiteList.empty()


    let _sites = getSiteByAlias(data.default, alias)
    const { sites } = _sites;
    sites.forEach((element, index) => {

        const { title, link } = element;
        let site = $(`
        <li class="site">
            <img src="https://i.olsh.me/icon?size=80..120..200&url=kilig.ujuji.com" alt="">
            <div class="text"></div>
        </li>`)
        let img = site.children('img')
        let text = site.children('.text')

        site.attr('data-link', link)
        text.text(title)
        img.attr('src', FAVICON_API_URL + matchDomain(link))

        // 如果是第一个的话，就默认选中
        if (index === 0) {
            iframe.attr('src', link)
            site.addClass('active').siblings().removeClass('active')
            oLoading.css({ display: 'block' })
        }

        // 添加点击事件
        site.on('click', () => {
            iframe.attr('src', link)
            site.addClass('active').siblings().removeClass('active')
            oLoading.css({ display: 'block' })
        })

        leftSiteList.append(site)
    });



}

// 处理加载中事件
iframe.on('load', () => {
    oLoading.css({ display: 'none' })
    iframe.css({ display: 'block' })
})
iframe.on('error', () => {
    err.css({ display: 'block' })
})



// 生成顶部
_genTop()







// 底部

yearDom.innerText = new Date().getFullYear()
