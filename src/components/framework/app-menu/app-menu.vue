<template>
  <div class="app-menu-wrap">
    <router-link v-for="(nav, index) in navList" :key="index" :to="nav.path" active-class="current" class="menu-link">{{ nav.name }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'AppMenu',
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
          path: '/thoughts',
        },
        {
          name: '前端资源',
          path: '/resources',
        },
        {
          name: '后台管理',
          path: '/admin',
        },
        {
          name: '登录',
          path: '/login/',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.app-menu-wrap {
  color: @colorTextTitle;
  .menu-link {
    font-size: 15px;
    position: relative;
    padding: 0 15px;
    margin: 0 10px;
    display: inline-block;
    line-height: @heightHeader;
    transition: color 0.25s ease;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      height: 0;
      width: 0;
      border-bottom: 2px solid @colorPrimary;
      transition: all 0.3s ease;
    }
  }
  .menu-link:hover {
    &:after {
      width: 100%;
      left: 0;
    }
  }
  .menu-link.current {
    color: @colorPrimary;
    &:after {
      width: 100%;
      left: 0;
    }
  }
}
</style>
