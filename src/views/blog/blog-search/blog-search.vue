<template>
  <div class="z-container">
    <div class="filter-bar">
      <div class="z-row">
        <div class="z-col-10">
          <FilterSelect v-model="formData.category" :options="categoryList" placeholder="不限分类" labelKey="name" valueKey="_id"></FilterSelect>
        </div>
        <div class="z-col-10">
          <FilterSelect v-model="formData.tag" :options="tagList" multiple placeholder="不限标签" labelKey="name" valueKey="_id"></FilterSelect>
        </div>
        <div class="z-col-10">
          <FilterSelect v-model="formData.tag" :options="tagList" multiple placeholder="不限时间" labelKey="name" valueKey="_id"></FilterSelect>
        </div>
      </div>
    </div>

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
      </div>
    </div>
  </div>
</template>

<script src="./blog-search.js"></script>

<style lang="less">
.filter-bar {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid darken(@colorBorder, 5%);
}
.list-side {
  position: sticky;
  top: @heightHeader + 20;
}
.z-card.search-wrap {
  margin: 5px 0;
  // background-color: transparent;
  background-image: linear-gradient(90deg, @colorSuccess, @colorInfo);
}
</style>
