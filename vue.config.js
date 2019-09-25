const path = require('path');
const fs = require('fs');

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
};

const cdn = {
  dev: {
    css: ['//at.alicdn.com/t/font_1226722_3y2yzousivp.css'],
    js: [
      'https://cdn.bootcss.com/vue/2.6.6/vue.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.js',
    ],
  },
  pro: {
    css: ['//at.alicdn.com/t/font_1226722_3y2yzousivp.css'],
    js: [
      'https://cdn.bootcss.com/vue/2.6.6/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
    ],
  },
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getLessVariables(file) {
  var themeContent = fs.readFileSync(file, 'utf-8');
  var variables = {};
  themeContent.split('\n').forEach(function(item) {
    if (item.indexOf('//') > -1 || item.indexOf('/*') > -1) {
      return;
    }
    var _pair = item.split(':');
    if (_pair.length < 2) return;
    var key = _pair[0].replace('\r', '').replace('@', '');
    if (!key) return;
    var value = _pair[1]
      .replace(';', '')
      .replace('\r', '')
      .replace(/^\s+|\s+$/g, '');
    variables[key] = value;
  });
  return variables;
}

module.exports = {
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  configureWebpack: config => {
    config.externals = externals;
  },
  devServer: {
    port: 8082,
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/douban/': {
        target: 'http://api.douban.com/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/douban': '',
        },
      },
      '/douban/movie/': {
        target: 'http://api.douban.com/v2/movie',
        changeOrigin: true,
        pathRewrite: {
          '^/douban/movie/': '',
        },
      },
      '/doubanOld/': {
        target: 'https://movie.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/doubanOld/': '',
        },
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: getLessVariables(resolve('src/styles/variables.less')),
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('store', resolve('src/store'))
      .set('components', resolve('src/components'));

    config.plugin('html').tap(args => {
      args[0].cdn = IS_PROD ? cdn.pro : cdn.dev;
      return args;
    });
  },
};
