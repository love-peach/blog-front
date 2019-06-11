<template>
  <div class="tag-wrap"><slot></slot></div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'default',
    },
    radius: {
      type: [Number, String],
      default: '3px',
    },
    round: Boolean,
  },
};
</script>

<style lang="less" scoped>
.tag-wrap {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
}
</style>
