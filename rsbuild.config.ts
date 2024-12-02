import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

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
