<template>
  <Card :padding="20" style="height: 100%;">
    <UserPageTitle :title="`您已送出${totalEle}个爱心`" titleSub="提示：赞美别人就是肯定自己。"></UserPageTitle>
    <div class="z-row">
      <div class="z-col-15" v-for="(item, index) in blogList" :key="index">
        <UserFavoritesCard :blogData="item">
          <Btn icon="liked" theme="error" shape="rect" long @click="handleUnLike(item)">取消</Btn>
        </UserFavoritesCard>
      </div>
    </div>
    <Pagenation :totalEle="totalEle" :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 30px;" />
    <Modal v-if="isShowUnlikeModal" @close="handleHideUnlikeModal">
      <h3 slot="header">确认取消喜欢?</h3>
      <div slot="footer">
        <Btn theme="error" long @click="requestUnLike" :loading="isUnLikeLoading">确认取消</Btn>
      </div>
    </Modal>
  </Card>
</template>

<script>
import Card from '@/components/base/card/';
import UserPageTitle from '../components/user-page-title.vue';
import Pagenation from '@/components/base/pagenation/';
import Btn from '@/components/base/btn/';
import UserFavoritesCard from '../components/user-favorites-card.vue';
import Modal from '@/components/base/modal/';

import api from '@/api/';
const { mapGetters, mapActions } = Vuex;

export default {
  name: 'UserFavorites',
  components: {
    Card,
    UserPageTitle,
    Pagenation,
    Btn,
    UserFavoritesCard,
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
      isShowUnlikeModal: false,
      isUnLikeLoading: false,
      currentRow: {},
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
        likes: this.userInfo._id,
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
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.currentRow.id,
        userId: this.userInfo._id,
      };
      this.isUnLikeLoading = true;
      api
        .PostBlogUnLike(params)
        .then(() => {
          this.$toast.warning('已取消赞！');
          this.requestblogList();
          this.isUnLikeLoading = false;
          this.handleHideUnlikeModal();
        })
        .catch(() => {
          this.isUnLikeLoading = false;
        });
    },

    handleUnLike(row) {
      this.currentRow = row;
      this.handleShowUnlikeModal();
    },

    /**
     * @desc 显示删除文章弹框
     */
    handleShowUnlikeModal() {
      this.isShowUnlikeModal = true;
    },

    /**
     * @desc 隐藏删除文章弹框
     */
    handleHideUnlikeModal() {
      this.isShowUnlikeModal = false;
    },
  },
};
</script>
