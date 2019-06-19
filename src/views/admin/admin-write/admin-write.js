import ZSelect from '@/components/base/z-select/';
import Btn from '@/components/base/btn/';
import Upload from '@/components/base/upload/';
import MdEditor from '@/components/kit/md-editor/';
import ZSwitch from '@/components/base/z-switch/';
import webStore from '@/utils/storage';

import api from '@/api/';

const { mapGetters, mapActions } = Vuex;

export default {
  name: 'AdminWrite',
  components: {
    ZSelect,
    Btn,
    Upload,
    MdEditor,
    ZSwitch,
  },
  data() {
    return {
      isPostBlogLoading: false,
      isBlogDetailLoading: false,
      formData: {
        poster: '',
      },
      isTagLoading: false,
      tagList: [],
      blogId: this.$route.params.blogId,
    };
  },
  computed: {
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
  created() {
    this.requestTagList();
    if (this.blogId) {
      this.requestBlogDetail();
    }
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),

    /**
     * @desc 请求 博客详情 编辑
     */
    requestBlogDetail() {
      const params = {
        blogId: this.$route.params.blogId,
      };
      this.isBlogDetailLoading = true;
      api
        .GetBlogDetail(params)
        .then(res => {
          this.isBlogDetailLoading = false;
          this.handleRecoveryBlogDetail(res.result);
        })
        .catch(() => {
          this.isBlogDetailLoading = false;
        });
    },

    /**
     * @desc 请求 标签列表
     */
    requestTagList() {
      this.isTagLoading = true;
      api
        .GetTagList()
        .then(res => {
          this.tagList = res.result;
          this.isTagLoading = false;
        })
        .catch(() => {
          this.isTagLoading = false;
        });
    },

    /**
     * @desc 编辑的时候 博客详情回显
     */
    handleRecoveryBlogDetail(data) {
      const { title, category, tag, poster, content, status } = data;
      this.formData = {
        title,
        category: [category],
        tag,
        poster,
        content,
        status,
      };
    },

    /**
     * @desc 上传 格式出错
     */
    handleFormatError(file) {
      this.$toast.warning(`文件 ${file.name} 格式不对, 请选择 jpg or png.`, { duration: 4000 });
    },

    /**
     * @desc 上传 大小限制
     */
    handleMaxSize(file) {
      this.$toast.warning(`文件 ${file.name} 太大, 不可超过2M`);
    },

    /**
     * @desc 上传 成功
     */
    handleUploadSuccess(res) {
      console.log(res.result.path, 'res.result.path');
      this.formData.poster = res.result.path;
    },

    /**
     * @desc 检查表单填写是否合格
     */
    checkIsReadyPost() {
      const { title, category, tag, poster, content } = this.formData;
      const userInfo = webStore.getUserInfo();
      if (!title) {
        this.$toast.error('请填写文章标题');
      } else if (!category) {
        this.$toast.error('请选择文章分类');
      } else if (!tag) {
        this.$toast.error('请选择文章标签');
      } else if (!poster) {
        this.$toast.error('请选择文章海报');
      } else if (!content) {
        this.$toast.error('请填写文章内容');
      } else if (!userInfo) {
        this.$toast.info('请登录');
        this.toggleSignInModal(true);
      } else {
        return true;
      }
      return false;
    },

    /**
     * @desc 提交
     */
    handleSubmit() {
      if (!this.checkIsReadyPost()) {
        return;
      }
      if (this.blogId) {
        this.requestEditArticle();
      } else {
        this.requestArticle();
      }
    },

    /**
     * @desc 请求 发布文章
     */
    requestArticle() {
      const params = {
        ...this.formData,
        author: webStore.getUserInfo()._id,
      };
      this.isPostBlogLoading = true;
      api
        .PostBlog(params)
        .then(res => {
          this.isPostBlogLoading = false;
          this.$router.push({ path: `/blog/detail/${res.result._id}` });
        })
        .catch(() => {
          this.isPostBlogLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章
     */
    requestEditArticle() {
      const params = {
        ...this.formData,
        blogId: this.blogId,
        author: webStore.getUserInfo()._id,
      };
      this.isPostBlogLoading = true;
      api
        .PutBlog(params)
        .then(res => {
          this.isPostBlogLoading = false;
          this.$router.push({ path: `/blog/detail/${res.result._id}` });
        })
        .catch(() => {
          this.isPostBlogLoading = false;
        });
    },
  },
};
