import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';
import ZPanel from '@/components/base/panel/';
import EbookPoster from '../components/ebook-poster.vue';

import api from '@/api/api-ebook';

export default {
  name: 'EbookCatalog',
  components: {
    EbookPoster,
    ZPanel,
    TitleBar,
    ZTable,
  },
  data() {
    return {
      isLoading: false,
      bookInfoData: {},
    };
  },
  mounted() {
    this.getBookInfo();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path.indexOf('/ebook/catalog') > -1) {
      this.getBookInfo(to.params.bookId);
    }
    next();
  },
  methods: {
    /**
     * @desc 获取书籍信息
     */
    getBookInfo(bookId = this.$route.params.bookId) {
      this.isLoading = true;
      api
        .getBookInfo({ bookId })
        .then(res => {
          this.isLoading = false;
          this.bookInfoData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
