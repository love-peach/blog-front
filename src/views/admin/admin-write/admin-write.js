import Multiselect from 'vue-multiselect';
import ZSelect from '@/components/base/z-select/';
import Btn from '@/components/base/btn/';
import Upload from '@/components/base/upload/';
import MdEditor from '@/components/kit/md-editor/';

import api from '@/api/';

import 'vue-multiselect/dist/vue-multiselect.min.css';

const { mapGetters } = Vuex;

export default {
  name: 'AdminWrite',
  components: {
    Multiselect,
    ZSelect,
    Btn,
    Upload,
    MdEditor,
  },
  data() {
    return {
      isPostBlogLoading: false,
      formData: {
        poster: '',
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

    /**
     * @desc 提交
     */
    handleSubmit() {
      console.log(this.formData, 'formData');
    },

    /**
     * @desc 请求 发布文章
     */
    requestArticle() {
      const params = {
        ...this.formData,
        author: 'zhangjinpei',
      };
      this.isPostBlogLoading = true;
      api
        .backendPostArticle(params)
        .then(res => {
          this.isPostBlogLoading = false;
          this.$router.push({ path: `/detail/wordpress/${res.data._id}` });
        })
        .catch(() => {
          this.isPostBlogLoading = false;
        });
    },
  },
};
