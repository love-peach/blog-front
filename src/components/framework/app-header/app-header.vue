<template>
  <header :class="['app-header-wrap', menuTheme]">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" active-class="current" exact class="app-header-brand">
          <Icon type="logo" :size="136" />
        </router-link>
        <AppMenu :theme="menuTheme" />
      </div>
    </div>
  </header>
</template>

<script>
import Icon from '@/components/base/icon/';
import AppMenu from '@/components/framework/app-menu/';
import { throttle } from '@/utils/tools';

export default {
  name: 'AppHeader',
  components: {
    Icon,
    AppMenu,
  },
  data() {
    return {
      scrollTop: 0,
    };
  },
  computed: {
    menuTheme() {
      const isHomePage = this.$route.path.indexOf('/home') === 0;
      let menuTheme = '';
      if (isHomePage) {
        if (this.scrollTop > 240 - 50) {
          menuTheme = 'white';
        } else {
          menuTheme = 'black';
        }
      } else {
        menuTheme = 'white';
      }
      return menuTheme;
    },
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 0);
    window.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    scrollHandler() {
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollTop = t;
    },
  },
};
</script>

<style lang="less" scoped>
.app-header-wrap {
  margin-bottom: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background ease 0.3s;
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-header-brand {
    margin-right: 30px;
    .iconfont {
      line-height: @heightHeader;
      &:before {
        display: block;
      }
    }
  }
}
.app-header-wrap.white {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  .app-header-brand {
    color: @colorTextContent;
  }
}
.app-header-wrap.black {
  .app-header-brand {
    color: @colorTextSilver;
  }
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
