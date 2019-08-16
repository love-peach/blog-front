<template>
  <div class="app-header-wrap">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" active-class="current" exact class="app-header-brand">
          <Icon type="logo" :size="166" />
        </router-link>
        <AppMenu />
        <AppSearch></AppSearch>
        <div>
          <ZBtn theme="text">登录</ZBtn>
          <ZBtn theme="text">注册</ZBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';
import ZBtn from '@/components/base/btn/';
import AppMenu from '@/components/framework/app-menu/';
import AppSearch from '@/components/framework/app-search/';

export default {
  name: 'AppHeader',
  components: {
    Icon,
    ZBtn,
    AppMenu,
    AppSearch,
  },
};
</script>

<style lang="less" scoped>
.app-header-wrap {
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
