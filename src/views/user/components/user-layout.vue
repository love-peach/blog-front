<template>
  <div class="z-container">
    <div class="user-page-wrap">
      <div class="user-page-side">
        <div class="hidden-xs">
          <UserBrief />
        </div>
        <Card :padding="0" style="margin-bottom: 0;">
          <UserMenu></UserMenu>
        </Card>
      </div>
      <div class="user-page-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/base/card/';
import UserMenu from './user-menu.vue';
import UserBrief from './user-brief.vue';

export default {
  name: 'UserLayout',
  components: {
    Card,
    UserMenu,
    UserBrief,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.user-page-wrap {
  display: flex;
}
.user-page-side {
  width: 240px;
  margin-right: 20px;
}
.user-page-main {
  flex: 1;
}
</style>
