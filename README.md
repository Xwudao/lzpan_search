### 懒盘搜索

Demo: [http://lzpan.com](http://lzpan.com)

### 使用

0-1、首先你需要在本地安装 node 环境，node 下载： [https://nodejs.org/en/](https://nodejs.org/en/)

测试下载安装是否准确：打开 cmd(terminal)，输入`node -v` 以及`npm -v`（分开两次输入）

如果均显示了对应的版本信息，那么就安装准确！

0-2、还需要安装 git 软件，因为下一步需要克隆项目到本地

1、克隆项目到本地：

`git clone https://github.com/Xwudao/lzpan_search.git`

2、安装依赖：

`yarn` or `npm i`

3、修改一些你想修改到东西，然后进行第 4 步构建

4、构建

`yarn build` or `npm run build`

5、构建后会生成一个 dist 目录，然后复制这个目录里面到文件到你的网站根目录即可！

### 你可能想更改的东西

1、src/data/data.json

此文件是所有网站的数据，按照相应格式更改即可

2、public/index.html\mobile.html

修改里面到标题等信息

### 协议

MIT
