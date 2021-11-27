# choral-music-player
一个高颜值音乐播放器

## 本地开发

* 构建

```sh
$ npm install
$ npm run dev
```

* 查看页面

配置本地代理 [whistle](http://wproxy.org/whistle/install.html) 后访问.

```js
// 配置规则
/docs.qq.com/choral-music-player/(.*)/ file:///你的工作目录/choral-music-player/dist/$1
```

访问页面, 如:
* `https://docs.qq.com/choral-music-player/index.html`

## 部署

```sh
$ npm run dist
```

## 开发文档

* [项目目录](./docs/项目目录.md)
* [技术栈清单](./docs/技术栈清单.md)

## EOF
