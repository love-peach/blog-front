import ZBtn from '@/components/base/btn/';
import ZTable from '@/components/base/table/';

import api from '@/api/api-ebook';

export default {
  name: 'EbookSearch',
  components: {
    ZBtn,
    ZTable,
  },
  data() {
    return {
      wd: '',
      isLoading: false,
      searchData: [],
      columns: [
        {
          title: '序号',
          width: '45px',
          class: ['hidden-sm'],
          render: (h, params) => {
            return h(
              'span',
              {
                class: ['ebook-rank-index'],
              },
              params.index + 1
            );
          },
        },
        {
          title: '作品分类',
          key: 'category',
          align: 'left',
          class: ['hidden-xs'],
        },
        {
          title: '作品名称',
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
          align: 'left',
        },
        {
          title: '更新时间',
          key: 'updateTime',
          align: 'center',
          class: ['hidden-xs'],
          render: (h, params) => {
            return h('span', params.row.updateTime.split(' ')[0]);
          },
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          minWidth: '45px',
          class: ['hidden-xs'],
        },
      ],
    };
  },
  mounted() {
    if (this.$route.query.wd) {
      this.getBookByWd(this.$route.query.wd);
    }
  },
  methods: {
    /**
     * @desc 查询按钮点击
     */
    handleSearch() {
      this.getBookByWd();
    },

    /**
     * @desc 关键字查询书籍
     */
    getBookByWd(wd = this.wd) {
      this.isLoading = true;
      api
        .getBookByWd({ wd })
        .then(res => {
          this.isLoading = false;
          this.searchData = res.result;
        })
        .catch(err => {
          console.log(err, 'err');
          this.isLoading = false;
        });
    },
  },
};
