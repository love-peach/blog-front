<template>
  <div class="z-upload" @click="handleClick">
    <slot></slot>
    <input ref="input" type="file" :multiple="multiple" class="z-upload-input" @change="handleChange" :accept="accept" />
  </div>
</template>

<script src="./upload.js"></script>

<style lang="less" scoped>
.z-upload {
  &-input {
    display: none;
  }
}
</style>
