<template>
  <Card :padding="0">
    <div class="card-brief-blog-wrap">
      <div class="brief-poster" :style="{ 'background-image': 'url(' + avatar + ')' }"></div>
      <div class="author-avatar">
        <div class="author-avatar-box" :style="{ 'background-image': 'url(' + avatar + ')' }"></div>
      </div>
      <h3 class="brief-title">{{ userInfo ? userInfo.nicName || userInfo.userName : '' }}</h3>
    </div>
  </Card>
</template>

<script>
import Card from '@/components/base/card/';
const { mapGetters } = Vuex;

export default {
  name: 'CardBriefBlog',
  components: {
    Card,
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
    avatar() {
      return this.userInfo ? this.userInfo.avatar : '';
    },
  },
};
</script>

<style lang="less" scoped>
.card-brief-blog-wrap {
  text-align: center;
  .brief-poster {
    padding-top: 61.8%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: #d51f45;
  }
  .author-avatar {
    position: relative;
    padding-top: 38.2%;
    width: 38.2%;
    margin: -19% auto 0;
    border-radius: 100%;
    border: 5px solid @colorBorderLight;
    box-sizing: content-box;
  }
  .author-avatar-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .brief-title {
    margin-top: 15px;
    padding-bottom: 10px;
    color: @colorTextTitle;
    font-weight: normal;
  }
}
</style>
