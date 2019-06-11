<template>
  <div>
    <template v-if="blogList.length > 0">
      <CardTopic v-for="(blog, index) in blogList" :key="index" :topic="blog">{{ blog.title }}</CardTopic>
    </template>
    <CardNoData v-else style="height: 300px;" />
  </div>
</template>

<script src="./blog-content-list.js"></script>
