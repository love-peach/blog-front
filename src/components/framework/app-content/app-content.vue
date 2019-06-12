<template>
  <div class="app-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppContent',
};
</script>

<style lang="less" scoped>
.app-content {
  flex: 1;
}
</style>
