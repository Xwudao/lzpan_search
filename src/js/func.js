export const selector = (domName) => {
    return document.querySelector(domName)
}

export const matchDomain = (url) => {
    let d = /^(?:https?:\/\/)?([(\w+).]+)\/?/ig.exec(url);
    if (d && d.length >= 2) {
        return d[1] || '';
    } else {
        return 'lzpan.com';
    }
}


// 获取顶部的分类
export const getCategories = (data) => {
    let menus = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            menus.push({ alias: element.alias, title: element.title })

        }
    }
    return menus;
}


// 获取顶部的分类
export const getSiteByAlias = (data, alias) => {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element.alias === alias) return element;
        }
    }
    return {};
}

export const isMobile = () => {
    const sUserAgent = navigator.userAgent.toLowerCase();
    return /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent);

}