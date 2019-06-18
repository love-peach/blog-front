import Card from '@/components/base/card/';
import MdAnchorNav from '@/components/kit/md-anchor-nav/index.js';
import NoData from '@/components/kit/no-data/';
import getMKTitles from '@/utils/getMKTitles.js';
import { throttle } from '@/utils/tools';

const { mapGetters } = Vuex;

export default {
  name: 'CardMdNav',
  components: {
    Card,
    MdAnchorNav,
    NoData,
  },
  data() {
    return {
      idPrefix: 'titleAnchor-',
      offsetTopList: [],
    };
  },
  computed: {
    ...mapGetters({
      blogResult: 'common/getBlogResult',
    }),
    articleTitles() {
      return getMKTitles(this.blogResult.content || '');
    },
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    });
    window.addEventListener('scroll', this.throttleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    scrollHandler() {
      const mdAnchorFloatBar = document.getElementById('mdAnchorFloatBar');
      const distance = 80;
      const headerList = this.getHeaderList();
      // 对所有的y值为正标的题，按y值升序排序。第一个标题就是当前处于阅读中的段落的标题。也即要高亮的标题
      let readingVO = headerList
        .filter(function(item) {
          return item.y > distance;
        })
        .sort(function(a, b) {
          return a.y - b.y;
        })[0];
      // TODO 如果已经到最底部了 继续下滑 readingVO 会取到 undefined , 报错 所以 这里需要判断下
      if (!readingVO) {
        return;
      }
      var floatBarHeight = headerList.slice(0, readingVO.index).reduce(function(preValue, curValue) {
        if (typeof preValue === 'number') {
          return preValue + curValue.navTitleClientHeight;
        } else {
          return preValue.navTitleClientHeight + curValue.navTitleClientHeight;
        }
      }, 0);
      this.$store.dispatch('common/changeHighLightIndex', { index: readingVO.index });
      mdAnchorFloatBar.style.top = `${floatBarHeight}px`;
      mdAnchorFloatBar.style.height = `${readingVO.navTitleClientHeight}px`;
    },
    getHeaderList() {
      const list = [];
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      for (var i = 0; i < this.articleTitles.length; i++) {
        let contentTitle = document.getElementById(`${this.idPrefix}${i}`);
        let navTitle = document.querySelector(`a[id="#${this.idPrefix}${i}"]`);
        if (!navTitle) {
          continue;
        }
        list.push({
          y: contentTitle.getBoundingClientRect().top,
          navTitleClientHeight: navTitle.clientHeight,
          contentTitleOffsetTopList: contentTitle.getBoundingClientRect().top + t,
          index: i,
        });
      }
      this.offsetTopList = list.map(item => item.contentTitleOffsetTopList);
      return list;
    },
  },
};
