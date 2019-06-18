<template>
  <div>
    <div id="briefWrap">
      <CardBriefBlog :blogResult="blogResult" v-if="blogResult && blogResult.content" />
      <CardNoData v-else style="height: 385px;" />
    </div>
    <div id="jsCardMdNav">
      <CardMdNav />
    </div>
  </div>
</template>

<script src="./blog-side-detail.js"></script>

<style lang="less" scoped>
.fixed-side-card {
  position: fixed;
  top: 15px;
  width: 100%;
  // overflow: auto;
  // max-width: @pageMaxWidthLg * 15 / 60 - 20;
  @media screen and (min-width: @breakpoints-xs) {
    // min-width: 320px;
  }

  @media screen and (min-width: @breakpoints-sm) {
    max-width: @containerMaxWidth-sm * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-md) {
    max-width: @containerMaxWidth-md * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-lg) {
    max-width: @containerMaxWidth-lg * 7 / 24 - 16;
  }

  @media screen and (min-width: @breakpoints-xl) {
    max-width: @containerMaxWidth-xl * 6 / 24 - 16;
  }
}
</style>
