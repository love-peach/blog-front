import EbookRankPart from './ebook-ranking-part.vue';

import api from '@/api/api-ebook';

export default {
  name: 'EbookRanking',
  components: {
    EbookRankPart,
  },
  data() {
    return {
      isLoading: false,
      rankData: [],
    };
  },
  mounted() {
    this.getRankingBook();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path.indexOf('/ebook/ranking') > -1) {
      this.getRankingBook(to.params.rankType);
    }
    next();
  },
  methods: {
    /**
     * @desc 获取排行榜书籍
     */
    getRankingBook(rankType = this.$route.params.rankType) {
      this.isLoading = true;
      api
        .getRankingBook({ rankType })
        .then(res => {
          this.isLoading = false;
          this.rankData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
