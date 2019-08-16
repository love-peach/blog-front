import api from '@/api/';
const { mapActions } = Vuex;
import Btn from '@/components/base/btn/';
// import { on, throttle } from '@/utils/tools';
import ZInputDebounce from '@/components/base/z-input-debounce/';

import MdPreview from '@/components/kit/md-preview/';

import CardBriefBlog from '@/components/kit/card-brief-blog/';
import CardMdNav from '@/components/kit/card-md-nav';
import CardNoData from '@/components/kit/card-no-data/';

import { throttle } from '@/utils/tools';

export default {
  name: 'BlogDetail',
  components: {
    Btn,
    ZInputDebounce,
    MdPreview,
    CardBriefBlog,
    CardMdNav,
    CardNoData,
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
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 20);
    window.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);

    // off(window, 'scroll', this.handleScroll());
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      var jsCardMdNav = document.getElementById('jsCardMdNav');
      var jsBriefWrap = document.getElementById('briefWrap');

      console.log(jsBriefWrap.clientHeight, 'jsBriefWrap.clientHeight');
      console.log(t, 't');
      if (t >= jsBriefWrap.clientHeight - 60 - 20) {
        jsCardMdNav.classList.add('fixed-side-card');
      } else {
        jsCardMdNav.classList.remove('fixed-side-card');
      }
    },

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
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
