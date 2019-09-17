<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-20 z-col-md-17 z-col-lg-15 z-col-xl-13">
        <div class="hidden-xs">
          <UserBrief />
        </div>
        <Card :padding="0">
          <UserMenu></UserMenu>
        </Card>
      </div>
      <div class="z-col-sm-40 z-col-md-43 z-col-lg-45 z-col-xl-47">
        <Card :padding="20">
          <router-view></router-view>
        </Card>
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
