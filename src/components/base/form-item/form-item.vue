<template>
  <div class="form-item">
    <label class="form-item-label">{{ label }} <small v-if="required">*</small></label>
    <slot></slot>
    <span class="tip" v-if="tip">{{ tip }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    label: String,
    labelWidth: {
      type: [Number, String],
      default: '120px',
    },
    tip: String,
    required: Boolean,
  },
};
</script>

<style lang="less" scoped>
.form-item {
  position: relative;
  margin-bottom: 10px;
  .form-item-label {
    font-size: 14px;
    display: inline-block;
    text-align: right;
    width: 120px;
    margin-right: 20px;
    vertical-align: middle;
    color: @colorTextSub;
  }
  .tip {
    font-size: 12px;
    margin: auto 10px;
    color: @colorTextLight;
  }
}
</style>
