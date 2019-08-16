import EbookSarch from '../components/ebook-search.vue';
import EbookMenu from '../components/ebook-menu.vue';
import TitleBar from '@/components/kit/title-bar/';
import ZTable from '@/components/base/table/';
import EbookPoster from '../components/ebook-poster.vue';
import api from '@/api/api-ebook';

export default {
  name: 'EbookHome',
  components: {
    EbookSarch,
    EbookMenu,
    TitleBar,
    ZTable,
    EbookPoster,
  },
  data() {
    return {
      isLoading: false,
      ebookHomeData: {},
      rankColumns: [
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
          title: '作者',
          key: 'author',
          align: 'right',
        },
      ],
      columnsLastUpdate: [
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
      columnsLastRecord: [
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
  created() {
    this.getEbookHomeData();
  },
  methods: {
    /**
     * @desc 获取首页数据
     */
    getEbookHomeData() {
      this.isLoading = true;
      api
        .getHomeData()
        .then(res => {
          this.isLoading = false;
          this.ebookHomeData = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
