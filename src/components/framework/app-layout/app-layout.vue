<template>
  <div class="app-layout-wrap">
    <AppHeader />
    <div class="app-content">
      <router-view></router-view>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/framework/app-header/';
import AppFooter from '@/components/framework/app-footer/';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.app-layout-wrap {
  // display: flex;
  // flex-direction: column;
  // height: 100%;
  // overflow: auto;
  height: 100%;
  .app-content {
    min-height: 100%;
    min-height: 100%;
    padding-bottom: @heightFooter + 20;
    // overflow: hidden;
  }
}
</style>
