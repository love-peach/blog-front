import api from '@/api/';
const { mapGetters, mapActions } = Vuex;
import Btn from '@/components/base/btn/';
import Tag from '@/components/base/tag/';
import Card from '@/components/base/card/';
import Billboard from '@/components/kit/billboard/';
import MdPreview from '@/components/kit/md-preview/';

import CardBriefBlog from '@/components/kit/card-brief-blog/';
import CardMdNav from '@/components/kit/card-md-nav';
import CardNoData from '@/components/kit/card-no-data/';
import CommentsForm from '@/components/kit/comments-form/';
import CommentsList from '@/components/kit/comments-list/';
import Pagenation from '@/components/base/pagenation/';

import { throttle } from '@/utils/tools';

export default {
  name: 'BlogDetail',
  components: {
    Btn,
    Tag,
    Card,
    Billboard,
    MdPreview,
    CardBriefBlog,
    CardMdNav,
    CardNoData,
    CommentsForm,
    CommentsList,
    Pagenation,
  },
  data() {
    return {
      isLikeLoading: false,
      isLoading: false,
      isCommentsListLoading: false,
      blogResult: {},
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
    isLiked() {
      const likes = this.blogResult.likes;
      if (likes && likes.length > 0 && this.userInfo && this.userInfo._id) {
        return likes.includes(this.userInfo._id);
      }
      return false;
    },
  },
  created() {
    this.requestBlogDetail();
    this.requestCommentsList();
  },
  mounted() {
    const vm = this;
    this.throttleScroll = throttle(function() {
      vm.scrollHandler();
    }, 20);
    window.addEventListener('scroll', this.throttleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    scrollHandler() {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      var jsCardMdNav = document.getElementById('jsCardMdNav');
      var jsBriefWrap = document.getElementById('briefWrap');

      if (t >= jsBriefWrap.clientHeight + 20) {
        jsCardMdNav.classList.add('fixed-side-card');
      } else {
        jsCardMdNav.classList.remove('fixed-side-card');
      }
    },

    /**
     * @desc 评论发表成功 回调
     */
    handleCommentsSuccess() {
      this.requestCommentsList();
    },

    /**
     * @desc 分页点击
     */
    changePage(page) {
      this.page = page;
      this.requestCommentsList();
    },

    /**
     * @desc 请求 文章详情
     */
    requestBlogDetail() {
      this.isLoading = true;
      const params = {
        blogId: this.$route.params.blogId,
      };
      api
        .GetBlogDetail(params)
        .then(res => {
          this.isLoading = false;
          this.blogResult = res.result;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 请求 评论列表
     */
    requestCommentsList() {
      this.isCommentsListLoading = true;
      const params = {
        blogId: this.$route.params.blogId,
        page: this.page,
        limit: this.limit,
      };
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

    /**
     * @desc 请求 点赞
     */
    requestLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id,
      };
      this.isLikeLoading = true;
      api
        .PostBlogLike(params)
        .then(res => {
          this.$toast.success('已赞！');
          this.blogResult.likes = res.result.likes;
          this.isLikeLoading = false;
        })
        .catch(() => {
          this.isLikeLoading = false;
        });
    },

    /**
     * @desc 请求 取消点赞
     */
    requestUnLike() {
      const params = {
        blogId: this.blogResult.id,
        userId: this.userInfo._id,
      };
      this.isLikeLoading = true;
      api
        .PostBlogUnLike(params)
        .then(res => {
          this.$toast.warning('已取消赞！');
          this.blogResult.likes = res.result.likes;
          this.isLikeLoading = false;
        })
        .catch(() => {
          this.isLikeLoading = false;
        });
    },

    /**
     * @desc 点击事件 点赞
     */
    handleLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestLike();
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },

    /**
     * @desc 点击事件 取消点赞
     */
    handleUnLike() {
      if (this.userInfo && this.userInfo._id) {
        this.requestUnLike();
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },
  },
};
