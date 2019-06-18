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
      formData: {
        poster: '',
        // category: ['5cf7730fea7ea70d94de1c68'],
        // tag: ['5cf73f39580230054b3356a1', '5cf73dc2091b54048a88aabc'],
      },
      isTagLoading: false,
      tagList: [],
    };
  },
  computed: {
    ...mapGetters('common', {
      categoryList: 'getCategoryList',
    }),
  },
  mounted() {
    this.requestTagList();
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
    }),
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
      this.checkIsReadyPost() && this.requestArticle();
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
  },
};
