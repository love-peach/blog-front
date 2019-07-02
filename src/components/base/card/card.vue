<template>
  <div class="card-wrap" :style="stylesWrap">
    <h3 class="card-header" v-if="title">{{ title }}</h3>
    <div class="card-body" :style="stylesBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
    },
    padding: {
      type: [String, Number],
      default: '15px',
    },
    borderRadius: {
      type: [String, Number],
      default: '10px',
    },
  },
  computed: {
    stylesWrap() {
      return {
        borderRadius: typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius,
      };
    },
    stylesBody() {
      return {
        padding: typeof this.padding === 'number' ? `${this.padding}px` : this.padding,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.card-wrap {
  background-color: #fff;
  margin-bottom: 15px;
  overflow: hidden;
  // border-radius: 10px;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
  }
  .card-header {
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid @colorBorderLight;
    color: @colorTextTitle;
  }
  .card-body {
    height: 100%;
  }
}
</style>
