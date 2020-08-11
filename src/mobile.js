import { isMobile } from './js/func'
import { selector, getCategories, matchDomain, getSiteByAlias } from './js/func'
import { FAVICON_API_URL } from './core/constants'
import * as data from './data/data.json'

if (!isMobile()) {
    window.location.href = 'index.html'
}

// doms
const yearDom = selector('#year')

const oIframe = $('iframe[name="search"]')
const oSelect = $('#select')
const oLoading = $('#loading')
const err = $('#err')


// fun 生成select
function _denSelect() {
    let _data = data.default;
    oSelect.empty();

    let domArr = []
    let isDefault = false;
    let isDisabled = false;
    for (const key in _data) {
        if (_data.hasOwnProperty(key)) {
            const element = _data[key];
            const { alias, title, sites } = element
            // 第一层，分类循环
            let oOption = $(`<option value="https://12312">懒盘</option>`)
            // oOption.attr('disabled', true)
            oOption.text('======' + title + '======')
            // oSelect.append(oOption)
            let tmpArr = []
            tmpArr.push(oOption)

            sites.forEach((item, index) => {

                const { link, title } = item;
                let oOption = $(`<option value="https://12312">懒盘</option>`)
                oOption.attr('value', link)
                oOption.text(title)


                tmpArr.push(oOption)
            })
            domArr.push(tmpArr)

        }
    }
    domArr.forEach((item) => {
        item.forEach((item2, index) => {
            // disabled
            if (index === 0 && !isDisabled) {
                isDisabled = true
                item2.attr('disabled', true)
            }
            // 默认选择
            if (index === 1 && !isDefault) {
                isDefault = true
                item2.attr('selected', true)
                oLoading.css({ display: 'block' })
                oIframe.attr('src', item2.val())
            }
            oSelect.append(item2)
        })
    })
}

// 选择

oSelect.on('change', () => {

    oLoading.css({ display: 'block' })
    oIframe.attr('src', oSelect.val())

})


// 处理加载中事件
oIframe.on('load', () => {
    oLoading.css({ display: 'none' })
    oIframe.css({ display: 'block' })
})
oIframe.on('error', () => {
    err.css({ display: 'block' })
})




_denSelect()






// 底部

yearDom.innerText = new Date().getFullYear()
