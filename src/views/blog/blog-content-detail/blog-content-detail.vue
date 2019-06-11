<template>
  <div class="blog-detail-wrap">
    <div class="blog-poster-wrap" :style="{ 'background-image': blogResult.posterUrl ? 'url(' + blogResult.posterUrl + ')' : '' }"></div>
    <h1 class="blog-content-title">{{ blogResult.title }}</h1>
    <p class="blog-content-time">{{ blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日') }}</p>
    <div style="height: 1000px;">
      <Btn theme="primary" @click="handleLogin">登录</Btn>
      <Btn theme="error" ghost icon="tag" shape="circle" size="small" :to="{ path: '/' }"></Btn>
      <Btn theme="error" ghost icon="tag" shape="circle"></Btn>
      <Btn theme="error" ghost icon="tag" long></Btn>
    </div>
  </div>
</template>

<script src="./blog-content-detail.js"></script>
<style lang="less" src="./blog-content-detail.less"></style>
