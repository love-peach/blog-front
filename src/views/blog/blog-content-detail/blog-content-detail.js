import api from '@/api/';
const { mapMutations, mapActions } = Vuex;
import Btn from '@/components/base/btn/';

export default {
  name: 'BlogDetail',
  components: {
    Btn,
  },
  data() {
    return {
      isLoading: false,
      blogResult: {},
    };
  },
  created() {
    this.requestBlogDetail();
    this.$toast('1212');
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),
    ...mapMutations({
      setBlogResult: 'common/setBlogResult',
    }),

    handleLogin() {
      this.toggleSignInModal(true);
    },

    /**
     * @desc 请求 文章详情
     */
    requestBlogDetail() {
      this.isLoading = true;
      const params = {
        blogId: this.$route.params.blogId,
      };
      api
        .GetBlogDetail(params)
        .then(res => {
          this.isLoading = false;
          this.blogResult = res.result;
          this.setBlogResult(res.result);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
