<template>
  <div>
    <CardCategory :categoryList="categoryList" />
  </div>
</template>

<script>
import CardCategory from '@/components/kit/card-category/';
const { mapGetters } = Vuex;

export default {
  name: 'BlogSideList',
  components: {
    CardCategory,
  },
  computed: {
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
};
</script>
