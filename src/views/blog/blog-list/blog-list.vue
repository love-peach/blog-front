<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-42 z-col-xl-45">
        <template v-if="blogList.length > 0">
          <CardTopic v-for="(blog, index) in blogList" :key="index" :topic="blog">{{ blog.title }}</CardTopic>
        </template>
        <CardNoData v-else style="height: 300px;" />
      </div>
      <div class="z-col-sm-18 z-col-xl-15">
        <CardCategory :categoryList="categoryList" />
      </div>
    </div>
  </div>
</template>

<script src="./blog-list.js"></script>
