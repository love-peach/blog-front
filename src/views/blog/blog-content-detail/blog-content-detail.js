import api from '@/api/';
const { mapMutations, mapActions } = Vuex;
import Btn from '@/components/base/btn/';
// import { on, throttle } from '@/utils/tools';
import ZInputDebounce from '@/components/base/z-input-debounce/';

import MdPreview from '@/components/kit/md-preview/';

export default {
  name: 'BlogDetail',
  components: {
    Btn,
    ZInputDebounce,
    MdPreview,
  },
  data() {
    return {
      isLoading: false,
      blogResult: {},
    };
  },
  created() {
    this.requestBlogDetail();
  },
  mounted() {
    // on(window, 'scroll', throttle(this.handleScrollEvent));
  },
  beforeDestroy() {
    // off(window, 'scroll', this.handleScroll());
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),
    ...mapMutations({
      setBlogResult: 'common/setBlogResult',
    }),

    handleChange(e) {
      console.log(e.target.value, '33');
    },

    handleScrollEvent(e) {
      console.log(e, 'e');
    },

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
