export default {
  name: 'AppHeader',
  data() {
    return {
      navList: [
        {
          name: '首页',
          path: '/home',
        },
        {
          name: '前端技术',
          path: '/blog',
        },
        {
          name: '图文有感',
          path: '/thoughts/',
        },
        {
          name: '前端资源',
          path: '/resources/',
        },
        {
          name: '登录',
          path: '/login/',
        },
      ],
    };
  },
};
