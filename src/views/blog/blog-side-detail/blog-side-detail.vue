<template>
  <div>
    <CardBriefBlog :blogResult="blogResult" />
    <CardMdNav />
  </div>
</template>

<script>
import CardBriefBlog from '@/components/kit/card-brief-blog/';
import CardMdNav from '@/components/kit/card-md-nav';

const { mapGetters } = Vuex;

export default {
  name: 'BlogSideDetail',
  components: {
    CardBriefBlog,
    CardMdNav,
  },
  computed: {
    ...mapGetters('common', {
      blogResult: 'getBlogResult',
    }),
  },
};
</script>
