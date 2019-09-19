<template>
  <div>
    <UserPageTitle :title="`您已发布${totalEle}篇文章作品`" titleSub="提示：删除后不可恢复，请谨慎操作。"></UserPageTitle>
    <ZTable :columns="columns" :data="blogList" :loading="isLoading" />
    <Pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteBlogModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.title }} 的文章吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteBlog">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script>
/* eslint-disable */
import UserPageTitle from '../components/user-page-title.vue';
import ZTable from '@/components/base/table/';
import Pagenation from '@/components/base/pagenation/';
import Btn from '@/components/base/btn/';
import ZSwitch from '@/components/base/z-switch/';
import Modal from '@/components/base/modal/';

import api from '@/api/';
const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserBlog',
  components: {
    UserPageTitle,
    ZTable,
    Pagenation,
    Btn,
    ZSwitch,
    Modal,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0,
      blogList: [],
      isLoading: false,
      isShowDeleteModal: false,
      currentRow: {},
      columns: [
        {
          title: '海报',
          key: 'poster',
          class: 'hidden-xs hidden-sm',
          width: '80px',
          render: (h, parama) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank',
                },
                props: {
                  to: {
                    path: `/blog/detail/${parama.row._id}`,
                  },
                },
              },
              [
                h('img', {
                  attrs: {
                    src: parama.row.posterUrl,
                  },
                  style: {
                    width: '80px',
                  },
                }),
              ]
            );
          },
        },
        {
          title: '标题',
          key: 'title',
          align: 'left',
          render: (h, parama) => {
            return h(
              'router-link',
              {
                attrs: {
                  target: '_blank',
                },
                props: {
                  to: {
                    path: `/blog/detail/${parama.row._id}`,
                  },
                },
              },
              parama.row.title
            );
          },
        },
        {
          title: '分类',
          key: 'category',
          align: 'left',
          render: (h, parama) => {
            return h('span', parama.row.categoryObj.name);
          },
        },
        {
          title: '标签',
          key: 'tagArr',
          width: '',
          align: 'left',
          class: 'hidden-xs',
          type: 'array',
          render: (h, parama) => {
            return h('span', parama.row.tagArray.map(item => item.name).join(','));
          },
        },
        {
          title: '时间',
          key: 'createAt',
          class: 'visible-lg visible-xl',
          render: (h, params) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:MM');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:MM');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        // {
        //   title: '浏览',
        //   key: 'viewed',
        // },
        // {
        //   title: '赞',
        //   key: 'liked',
        // },
        // {
        //   title: '评论',
        //   key: 'comment',
        // },
        {
          title: '状态',
          class: 'hidden-xs',
          render: (h, params) => {
            return h(ZSwitch, {
              props: {
                value: params.row.status,
              },
              on: {
                change: value => {
                  this.requestToggleBlogStatus(value, params.row);
                },
              },
            });
          },
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    to: { path: `/admin/write/${params.row._id}` },
                    theme: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                },
                '编辑'
              ),
              h(
                Btn,
                {
                  props: {
                    theme: 'error',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.currentRow = params.row;
                      this.handleShowDeleteBlogModal();
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  mounted() {
    this.requestblogList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
      handleChangeUserInfo: 'common/changeUserInfo',
    }),

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page;
      this.requestblogList();
    },

    /**
     * @desc 请求 文章列表
     */
    requestblogList() {
      if (!this.userInfo || !this.userInfo._id) {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
        return;
      }
      const params = {
        page: this.page,
        limit: this.limit,
        author: this.userInfo._id,
      };
      this.isLoading = true;
      api
        .GetBlogList(params)
        .then(res => {
          this.blogList = res.result.list;
          this.pageTotal = res.result.pages;
          this.totalEle = res.result.total;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 请求 上下架文章
     */
    requestToggleBlogStatus(value, row) {
      this.isToggleStatusLoading = true;
      const params = {
        blogId: row.id,
        status: value,
      };
      api
        .PutBlog(params)
        .then(() => {
          this.isToggleStatusLoading = false;
          this.$toast.success('操作成功！');
          row.status = value;
        })
        .catch(() => {
          this.isToggleStatusLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章
     */
    requestDeleteBlog() {
      this.isDeleteLoading = true;
      api
        .DeleteBlog({ blogId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.handleHideDeleteBlogModal();
          this.$toast.success('删除成功！');
          this.requestblogList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowDeleteBlogModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideDeleteBlogModal() {
      this.isShowDeleteModal = false;
    },
  },
};
</script>
