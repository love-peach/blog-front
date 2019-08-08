import EbookPoster from '../components/ebook-poster.vue';
import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';

import api from '@/api/api-ebook';

export default {
  name: 'EbookCategory',
  components: {
    EbookPoster,
    TitleBar,
    ZTable,
  },
  data() {
    return {
      isLoading: false,
      categoryData: {},
      columnsNewList: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : ''],
              },
              params.index + 1
            );
          },
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl'],
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/catalog/${params.row.bookId}`,
                  },
                },
                class: 'ebook-catalog-link',
              },
              params.row.name
            );
          },
        },
        {
          title: '最新章节',
          key: 'lastChapter',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/catalog/${params.row.bookId}/chapter/${params.row.chapterId}`,
                  },
                },
                class: 'ebook-chapter-link',
              },
              params.row.lastChapter
            );
          },
        },
        {
          title: '作者',
          key: 'author',
          align: 'right',
        },
        {
          title: '更新日期',
          key: 'updateTime',
          align: 'right',
          class: ['visible-xl'],
        },
      ],
      columnsClickRank: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-xs'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index', params.index <= 2 ? `ebook-rank-index-${params.index}` : ''],
              },
              params.index + 1
            );
          },
        },
        {
          title: '类别',
          key: 'category',
          align: 'left',
          class: ['visible-xl'],
        },
        {
          title: '书名',
          key: 'name',
          align: 'left',
          render: (h, params) => {
            return h(
              'router-link',
              {
                props: {
                  to: {
                    path: `/ebook/catalog/${params.row.bookId}`,
                  },
                },
              },
              params.row.name
            );
          },
        },
        {
          title: '作者',
          key: 'author',
          align: 'right',
        },
      ],
    };
  },
  mounted() {
    this.getCategoryBook();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path.indexOf('/ebook/category') > -1) {
      this.getCategoryBook(to.params.categoryName);
    }
    next();
  },
  methods: {
    /**
     * @desc 获取分类书籍
     */
    getCategoryBook(categoryName = this.$route.params.categoryName) {
      this.isLoading = true;
      api
        .getCategoryBook({ categoryName })
        .then(res => {
          this.isLoading = false;
          this.categoryData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
