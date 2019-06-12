<template>
  <div class="admin-side-wrap">
    <router-link to="/admin" active-class="current" class="admin-side-brand">
      <Icon type="logo" :size="166" />
    </router-link>
    <div class="admin-side-menu">
      <router-link active-class="current" class="menu-link" v-for="(nav, index) in sideMenu" :key="index" :to="nav.path">{{ nav.name }}</router-link>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';

export default {
  name: 'AdminSide',
  components: {
    Icon,
  },
  data() {
    return {
      sideMenu: [
        {
          name: '写文章',
          path: '/admin/write',
        },
        {
          name: '文章管理',
          path: '/admin/article',
        },
        {
          name: '文章分类管理',
          path: '/admin/category',
        },
        {
          name: '文章标签挂你',
          path: '/admin/tag',
        },
        {
          name: '前端资源管理',
          path: '/admin/resource',
        },
        {
          name: '用户管理',
          path: '/admin/user',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.admin-side-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 240px;
  .admin-side-brand {
    display: block;
    background-color: @colorPrimary;
    color: #fff;
    & > .iconfont {
      display: block;
      line-height: 60px;
      text-align: center;
      &:before {
        display: block;
      }
    }
  }
  .admin-side-menu {
    background-color: #001529;
    flex: 1;
  }
  .menu-link {
    display: block;
    padding: 15px 24px;
    color: #f1f1f1;
    background-color: #515a6e;
    transition: background-color 0.2s ease;
    &:hover {
      color: #fff;
      background-color: darken(#515a6e, 5%);
    }
    &.current {
      color: #fff;
      background-color: #363e4f;
    }
  }
  // .menu-link.current {
  //   background-color: #363e4f;
  // }
}
</style>
