<template>
  <ul class="user-menu">
    <router-link tag="li" exact active-class="active" class="menu-link" v-for="(nav, index) in menus" :key="index" :to="nav.path">{{ nav.name }}</router-link>
  </ul>
</template>

<script>
export default {
  name: 'UserMenu',
  data() {
    return {
      menus: [
        {
          name: '首页中心',
          path: '/user',
        },
        {
          name: '编辑资料',
          path: '/user/profile',
        },
        {
          name: '修改头像',
          path: '/user/avatar',
        },
        {
          name: '修改密码',
          path: '/user/password',
        },
        {
          name: '发布文章',
          path: '/user/write',
        },
        {
          name: '我的作品',
          path: '/user/blog',
        },
        {
          name: '我的喜欢',
          path: '/user/favorites',
        },
        {
          name: '我的评论',
          path: '/user/comment',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.user-menu {
  .menu-link {
    text-align: center;
    padding: 10px;
    // background-color: @colorBg;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @colorInfo;
    }
  }
  .menu-link + .menu-link {
    border-top: 1px dashed @colorBorder;
  }
  .active {
    color: @colorInfo;
  }
}
</style>
