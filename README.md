# Node Chromium Extension

使用`rsbuild`构建基于`solid.js`的`chromium`扩展。

## 使用

- 下载源码

```shell
git clone https://gitcode.com/uxy-template/node-chromium-extension.git
cd chromium-extension-example
```

- 安装依赖

```shell
npm i
```

- 构建

```shell
npm run build
```

- 在浏览器中加载扩展

1. 在浏览器中打开`chrome://extensions/`
2. 点击`开发者模式`
3. 点击`加载已解压的扩展程序`
4. 选择`dist`目录

## 构建过程

- 创建项目，设置项目名称、选择`solid`、选择`TypeScript`、选择`chromium`、选择`prettier`等

```shell
npm create rsbuild@latest
```

- 配置目录结构

```txt
+ node-chromium-extension   [项目根目录]
+-- scripts                 [脚本目录]
    +-- background          [后台脚本目录]
        |-- index.ts        [可以使用`import`、`export`]
        |-- other.ts        [来导入导出]
    +-- content             [内容脚本目录]
        |-- index.ts        [可以使用`import`、`export`]
        |-- other.ts        [来导入导出]
+-- src                     [页面源码目录]
    +-- assets              [静态资源目录]
        +-- fonts           [字体资源目录]
        +-- images          [图片资源目录]
        |-- icon- .png      [用于谷歌插件的16\32\48\128尺寸的图标资源]
        |-- popup- .png     [用于谷歌插件的16\32\48\128尺寸的图标资源]
        +-- locales         [国际化资源目录]
        +-- styles          [样式资源目录]
    +-- components          [组件目录]
        |-- index.ts        [导出目录下的所有组件]
        |-- other.tsx
    +-- entries             [页面(挂载)目录]
        |-- option.tsx      [Option页面，插件的设置页面]
        |-- popup.tsx       [Popup页面，插件的弹出页面]
        |-- side.tsx        [Side页面，插件的侧边栏页面]
    +-- icons               [组件目录]
    +-- pages               [页面目录]
        |-- index.ts        [导出目录下的所有页面]
        |-- Option.tsx      [Option页面具体实现]
        |-- Popup.tsx       [Popup页面具体实现]
        |-- Side.tsx        [Side页面具体实现]
    |-- env.d.ts
|-- .gitignore              [git忽略文件]
|-- .prettierignore         [prettier忽略文件]
|-- .prettierrc             [prettier配置文件]
|-- manifest.json           [谷歌插件配置文件]
|-- package.json            [npm包配置文件]
|-- README.md               [项目说明文件]
|-- rsbuild.config.ts       [rsbuild配置文件]
|-- tsconfig.json           [TypeScript配置文件]
```

- 配置`rsbuild.config.ts`

```typescript
export default defineConfig({
  source: {
    /**
     * 配置入口文件
     * - popup: 弹出页面
     * - option: 设置页面
     * - side: 侧边栏页面
     * - background: 后台脚本
     * - content: 内容脚本
     */
    entry: {
      popup: './src/entries/popup.tsx',
      option: './src/entries/option.tsx',
      side: './src/entries/side.tsx',
      background: {
        import: './scripts/background/index.ts',
        html: false,
      },
      content: {
        import: './scripts/content/index.ts',
        html: false,
      },
    },
  },
  /**
   * `Content`脚本不允许使用`import`、`export`
   * ** 为了降低构建复杂度，不拆分脚本 **
   * 如果模块较大，会造成性能问题
   */
  performance: {
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
  output: {
    /**
     * 配置输出目录
     * - js: js文件输出目录
     * - css: css文件输出目录
     * - html: html文件输出目录
     */
    distPath: {
      js: 'js',
      css: 'css',
      html: 'html',
    },
    /**
     * 配置输出文件名
     * 由于`background`和`content`是特殊的入口文件，
     * 所以需要特殊处理，不添加哈希
     */
    filename: {
      js: (pathData) => {
        if (
          pathData.chunk?.name === 'background' ||
          pathData.chunk?.name === 'content'
        ) {
          return '[name].js';
        } else {
          return '[name].[contenthash:8].js';
        }
      },
    },
    /**
     * 复制静态资源
     * - 复制插件清单
     * - 复制插件图标
     * - 复制插件国际化文件
     */
    copy: [
      { from: './manifest.json' },
      { from: './src/assets/images', to: 'images' },
      { from: './src/assets/locales', to: '_locales' },
    ],
  },
  /**
   * 配置插件以支持`Solid.js`、`jsx`、`TypeScript`
   * - pluginBabel: babel插件
   * - pluginSolid: solid插件
   */
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
});
```

- 配置`manifest.json`

```json
{
  "manifest_version": 3,
  "default_locale": "zh_CN",
  "name": "__MSG_name__",
  "description": "__MSG_description__",
  "version": "1.0",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  "content_scripts": [
    {
      "js": [
        "js/content.js"
      ],
      "matches": [
        "<all_urls>"
      ]
    }
  ],
  "background": {
    "service_worker": "js/background.js",
    "type": "module"
  },
  "action": {
    "default_icon": {
      "16": "images/action-16.png",
      "32": "images/action-32.png",
      "48": "images/action-48.png",
      "128": "images/action-128.png"
    },
    "default_popup": "html/popup.html"
  },
  "side_panel": {
    "default_path": "html/side.html"
  },
  "options_page": "html/option.html",
  "permissions": [
    "scripting",
    "activeTab",
    "sidePanel"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

- 注意：
    - `manifest_version`最新的版本为`3`，如果使用`2`版本，会出现`Unsupported manifest version: 2`错误
    - `name`和`description`使用`__MSG_name__`和`__MSG_description__`来支持国际化
    - `icons`和`action.default_icon`中路径和打包后路径保持一致，打包从`src/assets/images`目录下复制到`dist/images`目录下
    - `content_scripts`虽然不支持导入导出，但可以指定多个`js`文件，可以手动下载`js`文件到指定目录，然后手动添加到
      `content_scripts`中
    - `content_scripts`在本项目采用的方式是通过打包工具，将所有模块打包到一个`js`文件
    - `background`在版本为`3`和版本`2`不同，使用`service_worker`指定单个`js`文件，可以指定`type`为`module`来支持导入导出
    - `content_scripts.matches`和`host_permissions`中可以指定`all_urls`来允许所有网站访问插件
    - `permissions`
      具体参考[权限](https://developer.chrome.google.cn/docs/extensions/reference/permissions-list?hl=zh-cn)
    - 其他具体参考[清单](https://developer.chrome.google.cn/docs/extensions/reference/manifest?hl=zh-cn)
    - [谷歌插件文档](https://developer.chrome.google.cn/docs/extensions?hl=zh-cn)
