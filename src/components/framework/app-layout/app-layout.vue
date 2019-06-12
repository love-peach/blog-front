<template>
  <div class="app-layout-wrap">
    <AppHeader />
    <AppContent />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/framework/app-header/';
import AppContent from '@/components/framework/app-content/';
import AppFooter from '@/components/framework/app-footer/';

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppContent,
    AppFooter,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.app-layout-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
