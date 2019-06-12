<template>
  <div :class="classes" :style="styles">
    <div class="z-tag-content">
      <slot></slot>
    </div>
    <icon v-if="closable" type="close" @click.native.stop="handleClose"></icon>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/';
import { oneOf } from '@/utils/tools';
const prefixCls = 'z-tag';

export default {
  name: 'Tag',
  components: {
    Icon,
  },
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error']);
      },
      default: 'default',
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default: 'default',
    },
    type: {
      type: String,
      validator(value) {
        return oneOf(value, ['border', 'dashed', 'default']);
      },
      default: 'default',
    },
    radius: {
      type: [Number, String],
      default: '0.3em',
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-closeable`]: this.closable,
          [`${prefixCls}-${this.type}`]: this.type !== 'default',
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
        },
      ];
    },
    styles() {
      return {
        borderRadius: typeof this.radius === 'number' ? `${this.radius}px` : this.radius,
      };
    },
  },
  methods: {
    handleClose(event) {
      this.$emit('on-close', event);
    },
  },
};
</script>

<style lang="less" scoped src="./tag.less"></style>
