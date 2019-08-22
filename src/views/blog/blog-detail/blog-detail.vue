<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-lg-42 z-col-xl-45">
        <div class="blog-detail-wrap">
          <div class="blog-poster-wrap" :style="{ 'background-image': blogResult.posterUrl ? 'url(' + blogResult.posterUrl + ')' : '' }"></div>
          <h1 class="blog-content-title">{{ blogResult.title }}</h1>
          <p class="blog-content-time">{{ blogResult.createdAt | dateFormatFilter('YYYY 年 MM 月 DD 日') }}</p>
          <MdPreview :content="blogResult.content" />
        </div>
      </div>
      <div class="z-col-lg-18 z-col-xl-15 hidden-md">
        <div id="briefWrap">
          <CardBriefBlog :blogResult="blogResult" v-if="blogResult && blogResult.content" />
          <CardNoData v-else style="height: 385px;" />
        </div>
        <div id="jsCardMdNav">
          <CardMdNav :blogResult="blogResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./blog-detail.js"></script>
<style lang="less" src="./blog-detail.less"></style>
