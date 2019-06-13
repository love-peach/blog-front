<template>
  <button :class="`${prefixCls}`" @click="handleClick" @focus="handleFocus" @blur="handleBlur">
    <template v-if="selectedArray.length === 0">
      <span :class="`${prefixCls}-placeholder`">{{ placeholder }}</span>
    </template>

    <template v-else>
      <template v-if="multiple">
        <Tag v-for="item in selectedArray" :key="item[valueKey]" theme="success" closeable @on-close="handleSelect(item)">{{ item[labelKey] }}</Tag>
      </template>
      <template v-else>
        <span :class="`${prefixCls}-label`">{{ selectedLabel }}</span>
      </template>
    </template>

    <Icon :class="`${prefixCls}-icon`" type="arrow-down" size="1.6em" />
    <ul :class="`${prefixCls}-options`" v-show="isShowOptions">
      <li :class="`${prefixCls}-options-item ${includeSomeValue(item, selectedArray) ? prefixCls + '-checked' : ''}`" v-for="(item, index) in options" :key="index" @click.stop="handleSelect(item)">
        <span>{{ item[labelKey] }}</span>
        <Icon :class="`${prefixCls}-check-icon`" type="check" />
      </li>
    </ul>
  </button>
</template>

<script src="./z-select.js"></script>

<style lang="less" scoped>
button {
  outline: none;
  display: block;
  width: 100%;
  padding: 0;
  line-height: inherit;
}
.z-select {
  text-align: left;
  position: relative;
  min-height: 40px;
  margin: 5px 0;
  padding-left: 10px;
  padding-right: 30px;
  border-radius: 5px;
  border: 1px solid darken(@colorBgBody, 5%);
  background-color: #fff;

  &:focus {
    border-color: @colorInfo;
  }
  &-placeholder {
    color: @colorTextSub;
    font-size: 14px;
  }
  &-label {
    line-height: 40px;
    font-size: 14px;
  }
  &-icon {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
  &-options {
    position: absolute;
    z-index: 999;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border: 1px solid darken(@colorBgBody, 5%);
  }
  &-options-item {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: @colorPrimary;
    }
  }
  &-check-icon {
    display: none;
  }
  &-options-item&-checked {
    color: #fff;
    background-color: @colorSuccess;
    &:hover {
      color: #fff;
      background-color: @colorError;
    }
  }
  &-options-item&-checked &-check-icon {
    display: block;
  }
}
</style>
