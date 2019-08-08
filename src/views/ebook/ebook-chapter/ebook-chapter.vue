<template>
  <div v-loading="isLoading">
    <div class="chapter-wrap">
      <h1 class="chapter-title">{{ chapterData.title }}</h1>
      <div class="chapter-content" v-html="chapterData.content"></div>
    </div>

    <div class="z-row" style="padding: 5% 10%;">
      <div class="z-col-20">
        <router-link :to="{ path: `/ebook/catalog/${chapterData.bookId}/chapter/${chapterData.chapterPrevId}` }">上一章</router-link>
      </div>
      <div class="z-col-20">
        <router-link :to="{ path: `/ebook/catalog/${chapterData.bookId}` }">目录</router-link>
      </div>
      <div class="z-col-20">
        <router-link :to="{ path: `/ebook/catalog/${chapterData.bookId}/chapter/${chapterData.chapterNextId}` }">下一章</router-link>
      </div>
    </div>
  </div>
</template>

<script src="./ebook-chapter.js"></script>

<style lang="less" scoped>
.chapter-wrap {
  max-width: 800px;
  margin: 0 auto;
  padding: 5% 10%;
  background-color: antiquewhite;
}
.chapter-title {
  font-size: 26px;
  color: @colorTextTitle;
}
.chapter-content {
  /deep/ p {
    text-indent: 2em;
    font-size: 16px;
    line-height: 1.8;
    margin: 0.8em 0;
    word-wrap: break-word;
    word-break: break-all;
    color: @colorTextContent;
  }
}
</style>
