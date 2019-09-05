<template>
  <div class="billboard" :style="wrapStyles">
    <div :class="['billboard-box', isHomePage ? 'billboard-box-homepage' : '']" :style="boxStyle">
      <div class="billboard-inner">
        <h1 class="billboard-inner-slogan">{{ title }}</h1>
        <p class="billboard-inner-slogan-sub">{{ titleSub }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billboard',
  props: {
    title: {
      type: String,
      default: '不积跬步，无以至千里',
    },
    titleSub: {
      type: String,
      default: 'No step, no mile.',
    },
    height: {
      type: [Number, String],
      default: '250px',
    },
    poster: String,
    sticky: Boolean,
    isHomePage: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    bgSrc() {
      return this.poster || 'https://picsum.photos/1280/240?image=' + this.getDate();
    },
    wrapStyles() {
      return {
        position: this.sticky ? 'sticky' : 'relative',
        top: 0,
        backgroundImage: `url(${this.bgSrc})`,
      };
    },
    boxStyle() {
      return {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
      };
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
    width: 100%;
  }
  &-box-homepage {
    padding-top: @heightHeader;
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
