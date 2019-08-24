<template>
  <div class="billboard" :style="{ 'background-image': `url(${bgSrc})`, 'background-position': `center ${bgPosition}px` }">
    <div class="billboard-box">
      <div class="billboard-inner">
        <h1 class="billboard-inner-slogan">不积跬步，无以至千里</h1>
        <p class="billboard-inner-slogan-sub">No step, no mile.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billboard',
  data() {
    return {
      bgPosition: 0,
    };
  },
  computed: {
    bgSrc() {
      return 'https://picsum.photos/1280/240?image=' + this.getDate();
    },
  },
  methods: {
    getDate() {
      const now = new Date();
      return `${now.getMonth()}${now.getDate()}`;
    },
    getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    },
  },
};
</script>

<style lang="less" scoped>
@billboardHeight: 250px;
.billboard {
  position: sticky;
  top: 0;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #333;
  &-box {
    display: inline-table;
    height: @billboardHeight;
    padding-top: @heightHeader;
    width: 100%;
  }
  &-inner {
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  &-inner-slogan {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 5px;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
  &-inner-slogan-sub {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    padding: 2px 8px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
