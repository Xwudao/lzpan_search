### 本源码

是网盘搜索导航：Demo [https://so.lzpanx.com](https://so.lzpanx.com)


需要搭建自己的网盘搜索网站，请参考下面：


### 使用ReMan搭建自己的网盘搜索网站

支持导入夸克、百度、迅雷网盘资源的搜索引擎源码

#### 简介

ReMan是一款拥有后台的个人网盘资源管理程序；

可以帮你管理、搜索自己的网盘资源；

**特点：**

- 完善的后台管理，可以管理资源、分类、用户、卡密等
- 支持手机端和电脑端（前台）
- 程序本身只有两个文件：config.yml 和 reman（**二进制文件，没有源码**）


**特色功能：**

- 支持设置分类，可以按分类展示资源列表
- 支持设置资源是自己的，这将在搜索结果中排在前面（有助于网盘拉新）
- **2024/05/12：添加用户系统+卡密系统**
- 提供热词、热门资源记录，可以在后台查看搜索热词
- 等等其它功能，在下面的演示环境中体验吧！


[https://docs.hunhepan.com/reman/](https://docs.hunhepan.com/reman/)



### 懒盘搜索

Demo: [http://so.lzpanx.com](http://so.lzpanx.com)

### 使用

0-1、首先你需要在本地安装 node 环境，node 下载： [https://nodejs.org/en/](https://nodejs.org/en/)

测试下载安装是否准确：打开 cmd(terminal)，输入`node -v` 以及`npm -v`（分开两次输入）

如果均显示了对应的版本信息，那么就安装准确！

0-2、还需要安装 git 软件，因为下一步需要克隆项目到本地

1、克隆项目到本地：

`git clone https://github.com/Xwudao/lzpan_search.git`

2、安装依赖：

```bash
npx pnpm i 
#or 
npm i
```

3、修改一些你想修改到东西，然后进行第 4 步构建

4、构建

```bash
npm run build
```


5、构建后会生成一个 dist 目录，然后复制这个目录里面到文件到你的网站根目录即可！

### 你可能想更改的东西

1、src/data/data.json

此文件是所有网站的数据，按照相应格式更改即可

2、public/index.html\mobile.html

修改里面到标题等信息


### 一些网盘搜索引擎网站推荐：

- https://alipanx.com
- https://qkpanso.com
- https://www.lzpanx.com
- https://www.ujuso.com


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Xwudao/lzpan_search&type=Date)](https://star-history.com/#Xwudao/lzpan_search&Date)

### 协议

MIT
