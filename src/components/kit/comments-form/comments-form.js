import Card from '@/components/base/card/';
import Btn from '@/components/base/btn/';
import api from '@/api/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'CardCommentsForm',
  props: {
    commentId: String,
    toUserId: String,
  },
  components: {
    Btn,
    Card,
  },
  data() {
    return {
      isAddCommentLoading: false,
      formData: {
        content: '',
      },
    };
  },
  computed: {
    ...mapGetters('common', {
      userInfo: 'getUserInfo',
    }),
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    handleLogin() {
      this.toggleSignInModal(true);
    },

    handleComment() {
      if (this.userInfo && this.userInfo._id) {
        if (this.commentId) {
          this.requestRepay();
        } else {
          this.requestComments();
        }
      } else {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      }
    },

    /**
     * @desc 请求 发表评论
     */
    requestComments() {
      const params = {
        blogId: this.$route.params.blogId,
        from: this.userInfo._id,
        content: this.formData.content,
      };
      this.isAddCommentLoading = true;
      api
        .PostComments(params)
        .then(() => {
          this.formData.content = '';
          this.$emit('on-success');
          this.isAddCommentLoading = false;
        })
        .catch(() => {
          this.isAddCommentLoading = false;
        });
    },

    /**
     * @desc 请求 发表回复
     */
    requestRepay() {
      const params = {
        commentId: this.commentId,
        from: this.userInfo._id,
        to: this.toUserId,
        content: this.formData.content,
      };
      this.isAddCommentLoading = true;
      api
        .PostReplys(params)
        .then(() => {
          this.formData.content = '';
          this.$emit('on-success');
          this.isAddCommentLoading = false;
        })
        .catch(() => {
          this.isAddCommentLoading = false;
        });
    },
  },
};
