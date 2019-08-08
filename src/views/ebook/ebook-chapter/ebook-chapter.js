import api from '@/api/api-ebook';

export default {
  name: 'EbookChapter',
  data() {
    return {
      isLoading: false,
      chapterData: {},
    };
  },
  mounted() {
    this.getChapter();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path.indexOf('/chapter/') > -1) {
      this.getChapter(to.params.bookId, to.params.chapterId);
    }
    next();
  },
  methods: {
    /**
     * @desc 获取分类书籍
     */
    getChapter(bookId = this.$route.params.bookId, chapterId = this.$route.params.chapterId) {
      this.isLoading = true;
      api
        .getChapter({ bookId, chapterId })
        .then(res => {
          this.isLoading = false;
          this.chapterData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
