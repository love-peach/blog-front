<template>
  <div class="app-header-wrap">
    <div class="z-container">
      <div class="app-header">
        <router-link to="/" active-class="current" exact class="app-header-brand">
          <i class="iconfont icon-logo"></i>
        </router-link>
        <div class="app-header-menu">
          <router-link v-for="(nav, index) in navList" :key="index" :to="nav.path" active-class="current" class="menu-link">{{ nav.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./app-header.js"></script>
<style src="./app-header.less" lang="less" scoped></style>
