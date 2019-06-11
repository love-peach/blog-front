<template>
  <component :is="tagName" :class="classes" :disabled="disabled" @click="handleClickLink" v-bind="tagProps">
    <Icon class="z-load-loop" type="loading" v-if="loading"></Icon>
    <Icon :type="icon" v-if="icon && !loading"></Icon>
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </component>
</template>

<script>
import Icon from '@/components/base/icon/';
import { oneOf } from '@/utils/tools';
import mixinsLink from '@/mixins/link';

const prefixCls = 'z-btn';

export default {
  name: 'Btn',
  mixins: [mixinsLink],
  components: {
    Icon,
  },
  props: {
    theme: {
      type: String,
      validator(value) {
        return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error', 'dashed', 'text']);
      },
      default: 'default',
    },
    shape: {
      validator(value) {
        return oneOf(value, ['rect', 'radius', 'circle']);
      },
      default: 'radius',
    },
    size: {
      type: String,
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default: 'default',
    },
    long: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showSlot: true,
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.theme}`,
        {
          [`${prefixCls}-long`]: this.long,
          [`${prefixCls}-ghost`]: this.ghost,
          [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: this.size !== 'default',
          [`${prefixCls}-loading`]: this.loading != null && this.loading,
          [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading),
        },
      ];
    },
    isHrefPattern() {
      const { to } = this;
      return !!to;
    },
    tagName() {
      const { isHrefPattern } = this;
      return isHrefPattern ? 'a' : 'button';
    },
    tagProps() {
      const { isHrefPattern } = this;
      if (isHrefPattern) {
        const { linkUrl, target } = this;
        return { href: linkUrl, target };
      } else {
        const { htmlType } = this;
        return { type: htmlType };
      }
    },
  },
  mounted() {
    this.showSlot = this.$slots.default !== undefined;
  },
  methods: {
    // Ctrl or CMD and click, open in new window when use `to`
    handleClickLink(event) {
      this.$emit('click', event);
      const openInNewWindow = event.ctrlKey || event.metaKey;
      this.handleCheckClick(event, openInNewWindow);
    },
  },
};
</script>

<style lang="less" scoped src="./btn.less"></style>
