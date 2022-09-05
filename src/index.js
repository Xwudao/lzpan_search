import {
    selector,
    getCategories,
    matchDomain,
    getSiteByAlias,
} from "./js/func";
import { FAVICON_API_URL } from "./core/constants";
import * as data from "./data/data.json";
import { isMobile } from "./js/func";

// constants

const KEY_SEARCH_KEY = "search_key";
const KEY_TOP_INDEX = "key_top_index";
const KEY_LEFT_INDEX = "key_left_index";

let jump = isMobile();

if (jump) {
    window.location.href = "mobile.html";
}

// doms
const yearDom = selector("#year");
const rightBar = $(".right-bar");
const rightMenus = rightBar.children(".menus");

const iframe = $('iframe[name="search"]');
const oLoading = $("#loading");
const oSearchInput = $("#search-input");
const oSearchBtn = $("#search-btn");
const err = $("#err");

const leftSiteList = $(".site-list");

// 全局变量
const nowChose = {
    link: "",
    searchUrl: "",
    topIndex: -1,
    leftIndex: -1,
};

// 全局处理
let kw = localStorage.getItem(KEY_SEARCH_KEY) || "";
if (kw) oSearchInput.val(kw);

let topIndex = localStorage.getItem(KEY_TOP_INDEX) || "";
let leftIndex = localStorage.getItem(KEY_LEFT_INDEX) || "";
console.log("leftIndex: ", leftIndex);

if (topIndex) nowChose.topIndex = topIndex * 1;
if (leftIndex) nowChose.leftIndex = leftIndex * 1;

// 处理顶部

let categories = getCategories(data.default);

function _genTop() {
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        let { title, alias } = element;

        let menu = $(`<li class="menu">
    <a href="#">网盘搜索</a>
    </li>`);

        let li = menu.children("li");
        let a = menu.children("li a");
        a.text(title);
        a.attr("data-alias", alias);

        // 添加事件，点击事件
        a.on("click", () => {
            menu.addClass("active").siblings().removeClass("active");
            _genLeft(alias);
            // 保存当前index
            localStorage.setItem(KEY_TOP_INDEX, index);
        });
        rightMenus.append(menu);

        if (nowChose.topIndex !== -1 && index === nowChose.topIndex) {
            //记住了上次的选择
            console.log("nowChose.topIndex: ", nowChose.topIndex);
            menu.addClass("active").siblings().removeClass("active");
            _genLeft(alias);
        } else if (index === 0) {
            // 如果第一个的话，就默认选中
            menu.addClass("active").siblings().removeClass("active");
            _genLeft(alias);
        }
    }
}

// 处理左侧，生成左侧

function _genLeft(alias) {
    // 先清空左侧
    leftSiteList.empty();

    let _sites = getSiteByAlias(data.default, alias);
    const { sites } = _sites;
    sites.forEach((element, index) => {
        const { title, link, searchUrl, open = false } = element;
        let site = $(`
        <li class="site">
            <img src="https://i.olsh.me/icon?size=80..120..200&url=kilig.ujuji.com" alt="">
            <div class="text"></div>
        </li>`);
        let img = site.children("img");
        let text = site.children(".text");

        site.attr("data-link", link);
        text.text(title);
        img.attr("src", FAVICON_API_URL + matchDomain(link));

        // 如果是第一个的话，就默认选中

        if (index === 0) {
            iframe.attr("src", link);
            site.addClass("active").siblings().removeClass("active");
            oLoading.css({ display: "block" });
            nowChose.searchUrl = searchUrl ? searchUrl : null;
        }

        // 添加点击事件
        site.on("click", () => {
            site.addClass("active").siblings().removeClass("active");
            nowChose.link = link;
            if (open) {
                window.open(link);
            } else {
                if (searchUrl) {
                    nowChose.searchUrl = searchUrl ? searchUrl : null;
                    _toSearch(); //处理搜索
                } else {
                    oLoading.css({ display: "block" });
                    iframe.attr("src", link);
                }
            }
        });
        // 添加右键事件
        site.on("contextmenu", () => {
            window.open(link, "_blank") ? null : (location.href = link);
        });

        leftSiteList.append(site);
    });
}

// 处理搜索相关

oSearchInput.on("input", (e) => {
    let val = oSearchInput.val();
    localStorage.setItem(KEY_SEARCH_KEY, val);
});

oSearchInput.on("keyup", (e) => {
    //回车
    if (e.keyCode === 13 && oSearchInput.val()) {
        _toSearch();
    }
});

oSearchBtn.on("click", () => {
    if (oSearchInput.val()) {
        _toSearch();
    }
});

// 跳转到搜索页面的按钮
function _toSearch() {
    console.log(nowChose);
    if (nowChose.searchUrl && oSearchInput.val().trim()) {
        let url = nowChose.searchUrl.replace(
            "[kw]",
            encodeURIComponent(oSearchInput.val())
        );
        oLoading.css({ display: "block" });
        iframe.attr("src", url);
    } else {
        oLoading.css({ display: "block" });
        iframe.attr("src", nowChose.link);
    }
}

// 处理iframe加载中事件
iframe.on("load", () => {
    oLoading.css({ display: "none" });
    iframe.css({ display: "block" });
});
iframe.on("error", () => {
    err.css({ display: "block" });
});

// 生成顶部
_genTop();

// 底部

yearDom.innerText = new Date().getFullYear();
