import Multiselect from 'vue-multiselect';
import Tag from '@/components/base/tag/';
import api from '@/api/';

import 'vue-multiselect/dist/vue-multiselect.min.css';

const { mapGetters } = Vuex;

export default {
  name: 'AdminWrite',
  components: {
    Tag,
    Multiselect,
  },
  data() {
    return {
      formData: {},
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
    handleClose(e) {
      console.log(e, '22');
    },
  },
};
