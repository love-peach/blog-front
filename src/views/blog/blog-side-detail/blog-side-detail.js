import CardBriefBlog from '@/components/kit/card-brief-blog/';
import CardMdNav from '@/components/kit/card-md-nav';
import CardNoData from '@/components/kit/card-no-data/';

const { mapGetters } = Vuex;

import { throttle } from '@/utils/tools';

export default {
  name: 'BlogSideDetail',
  components: {
    CardBriefBlog,
    CardMdNav,
    CardNoData,
  },
  computed: {
    ...mapGetters('common', {
      blogResult: 'getBlogResult',
    }),
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 20);
    window.addEventListener('scroll', this.throttleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      var jsCardMdNav = document.getElementById('jsCardMdNav');
      var jsBriefWrap = document.getElementById('briefWrap');
      if (t >= jsBriefWrap.clientHeight + 60 + 20) {
        jsCardMdNav.classList.add('fixed-side-card');
      } else {
        jsCardMdNav.classList.remove('fixed-side-card');
      }
    },
  },
};
