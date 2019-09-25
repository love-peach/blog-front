import Card from '@/components/base/card/';
import TopicItem from '../components/topic-item/';
import CardNoData from '@/components/kit/card-no-data/';
import CardCategory from '@/components/kit/card-category/';
import SearchBlog from '@/components/kit/search-blog/';

const { mapGetters } = Vuex;

import api from '@/api/';

export default {
  name: 'BlogList',
  components: {
    Card,
    TopicItem,
    CardNoData,
    CardCategory,
    SearchBlog,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      blogList: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', ['getCategoryIdByValue']),
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
  mounted() {
    this.requestblogList();
  },
  watch: {
    $route: {
      handler() {
        this.requestblogList();
      },
      deep: true,
    },
  },
  methods: {
    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        category: this.getCategoryIdByValue(this.$route.params.category),
      };
      api
        .GetBlogList(params)
        .then(res => {
          this.blogList = res.result.list;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 搜索
     */
    handleSearch(keyword) {
      this.$router.push({ path: '/blog/search', query: { keyword } });
    },
  },
};
