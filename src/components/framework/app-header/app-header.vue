<template>
  <div class="app-header-wrap">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" active-class="current" exact class="app-header-brand">
          <Icon type="logo" :size="166" />
        </router-link>
        <AppMenu />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';
import AppMenu from '@/components/framework/app-menu/';

export default {
  name: 'AppHeader',
  components: {
    Icon,
    AppMenu,
  },
};
</script>

<style lang="less" scoped>
.app-header-wrap {
  background-color: #fff;
  margin-bottom: 20px;
  .app-header {
    display: flex;
    justify-content: space-between;
  }
  .app-header-brand {
    margin-right: 30px;
    color: @colorTextContent;
    .iconfont {
      line-height: @heightHeader;
      &:before {
        display: block;
      }
    }
  }
}
</style>
