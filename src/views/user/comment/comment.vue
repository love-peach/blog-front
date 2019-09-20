<template>
  <div>
    <UserPageTitle :title="`您已发表 ${totalEle} 条评论。`" titleSub="提示：认真填写的点评会帮助到别人哦。"></UserPageTitle>

    <UserCommentItem v-for="(item, index) in commentsList" :key="index" :comment="item"></UserCommentItem>
    <Pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
  </div>
</template>

<script>
import UserPageTitle from '../components/user-page-title.vue';
import UserCommentItem from '../components/user-comment-item.vue';
import Pagenation from '@/components/base/pagenation/';

import api from '@/api/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserComment',
  components: {
    UserPageTitle,
    UserCommentItem,
    Pagenation,
  },
  data() {
    return {
      commentsList: [],
      page: 1,
      limit: 10,
      pageTotal: 0,
      totalEle: 0,
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  mounted() {
    this.requestCommentList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page;
      this.requestCommentsList();
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentList() {
      if (!this.userInfo || !this.userInfo._id) {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
        return;
      }
      const params = {
        from: this.userInfo._id,
        page: this.page,
        limit: this.limit,
      };
      this.isCommentsListLoading = true;
      api
        .GetComments(params)
        .then(res => {
          this.isCommentsListLoading = false;
          this.commentsList = res.result.list;
          this.pageTotal = res.result.pages;
          this.totalEle = res.result.total;
        })
        .catch(() => {
          this.isCommentsListLoading = false;
        });
    },
  },
};
</script>
