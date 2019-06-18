<template>
  <div class="switch-wrap" :class="{ 'is-disabled': disabled, 'is-checked': checked }" @click="switchValue">
    <span class="switch-bar" ref="core">
      <span class="switch-point"></span>
    </span>
  </div>
</template>

<style lang="less" scoped src="./z-switch.less"></style>
<script src="./z-switch.js"></script>
