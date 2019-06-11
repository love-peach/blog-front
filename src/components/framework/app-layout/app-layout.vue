<template>
  <div class="app-layout-wrap">
    <AppHeader />
    <AppContent />
    <AppFooter />
  </div>
</template>

<script src="./app-layout.js"></script>

<style lang="less" scoped>
.app-layout-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.app-container {
  flex: 1;
}
</style>
