import Card from '@/components/base/card/';
import TopicItem from '../components/topic-item/';
import CardNoData from '@/components/kit/card-no-data/';
import CardTopic from '@/components/kit/card-topic/';
import CardCategory from '@/components/kit/card-category/';
import AppSearch from '@/components/framework/app-search/';
import SearchBlog from '@/components/kit/search-blog/';
import FilterSelect from '../components/filter-select/';

import ZSelect from '@/components/base/z-select/';

const { mapGetters } = Vuex;

import api from '@/api/';

export default {
  name: 'BlogSearch',
  components: {
    Card,
    TopicItem,
    CardNoData,
    CardTopic,
    CardCategory,
    AppSearch,
    SearchBlog,
    ZSelect,
    FilterSelect,
  },
  data() {
    return {
      formData: {},
      page: 1,
      limit: 10,
      blogList: [],
      isLoading: false,
      tagList: [],
    };
  },
  computed: {
    ...mapGetters('common', ['getCategoryIdByValue']),
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
  watch: {
    $route: {
      handler() {
        this.requestblogList();
      },
      deep: true,
    },
  },
  mounted() {
    this.requestblogList();
    this.requestTagList();
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
        keyword: this.$route.query.keyword,
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
     * @desc 请求 标签列表
     */
    requestTagList() {
      this.isTagLoading = true;
      api
        .GetTag()
        .then(res => {
          this.tagList = res.result;
          this.isTagLoading = false;
        })
        .catch(() => {
          this.isTagLoading = false;
        });
    },

    /**
     * @desc 搜索
     */
    handleSearch(keyword) {
      this.$router.replace({ path: '/blog/search', query: { keyword: keyword } });
    },
  },
};
