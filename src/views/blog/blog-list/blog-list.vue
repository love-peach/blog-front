<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-md-42 z-col-xl-45">
        <template v-if="blogList.length > 0">
          <Card v-for="(blog, index) in blogList" :key="index">
            <TopicItem :topic="blog"></TopicItem>
          </Card>
        </template>
        <CardNoData v-else style="height: 300px;" />
      </div>
      <div class="list-side z-col-md-18 z-col-xl-15">
        <Card class="search-wrap">
          <SearchBlog @on-search="handleSearch"></SearchBlog>
        </Card>
        <CardCategory :categoryList="categoryList" />
      </div>
    </div>
  </div>
</template>

<script src="./blog-list.js"></script>

<style lang="less">
.list-side {
  position: sticky;
  top: @heightHeader + 20;
}
.z-card.search-wrap {
  background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
}
</style>
