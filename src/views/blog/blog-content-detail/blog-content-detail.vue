<template>
  <div class="blog-detail-wrap">
    <div class="blog-poster-wrap" :style="{ 'background-image': blogResult.posterUrl ? 'url(' + blogResult.posterUrl + ')' : '' }"></div>
    <h1 class="blog-content-title">{{ blogResult.title }}</h1>
    <p class="blog-content-time">{{ blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日') }}</p>
    <MdPreview :content="blogResult.content" />
  </div>
</template>

<script src="./blog-content-detail.js"></script>
<style lang="less" src="./blog-content-detail.less"></style>
