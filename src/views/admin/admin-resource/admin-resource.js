import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';
import ZSelect from '@/components/base/z-select/';

import api from '@/api/';

export default {
  name: 'AdminResource',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
    ZSelect,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      tableData: [],
      isResourceTypeLoading: false,
      resourceTypeList: [],
      isLoading: false,
      isAddLoading: false,
      isEditLoading: false,
      isDeleteLoading: false,
      currentRow: {},
      isShowDeleteModal: false,
      isShowResourceModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
        },
        {
          title: '海报',
          key: 'poster',
          width: '80px',
          render: (h, parama) => {
            return h('img', {
              attrs: {
                src: parama.row.poster,
              },
              style: {
                width: '80px',
              },
            });
          },
        },
        {
          title: '名称',
          key: 'name',
        },
        {
          title: '地址',
          key: 'url',
        },
        {
          title: '简介',
          key: 'desc',
        },
        {
          title: '资源分类',
          render: (h, params) => {
            return h('span', params.row.resourceTypeObj.name);
          },
        },
        {
          title: '时间',
          render: (h, params) => {
            const createdAtFormat = this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:MM');
            const updatedAtFormat = this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:MM');
            return h('div', [h('div', createdAtFormat), h('div', updatedAtFormat)]);
          },
        },
        {
          name: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                Btn,
                {
                  props: {
                    theme: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.handleEditResource(params.row);
                    },
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
                      this.handleShowDeleteModal();
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
  mounted() {
    this.requestResourceTypeList();
    this.requestResourceList();
  },
  methods: {
    /**
     * @desc 请求 获取文章资源类别列表
     */
    requestResourceTypeList() {
      this.isResourceTypeLoading = true;
      api
        .GetResourceType()
        .then(res => {
          this.resourceTypeList = res.result;
          this.isResourceTypeLoading = false;
        })
        .catch(() => {
          this.isResourceTypeLoading = false;
        });
    },

    /**
     * @desc 请求 获取文章资源列表
     */
    requestResourceList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      api
        .GetResource(params)
        .then(res => {
          this.tableData = res.result.list;
          this.pageTotal = res.result.pages;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    /**
     * @desc 请求 新增文章资源列表
     */
    requestAddResource() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      api
        .PostResource(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideResourceModal();
          this.requestResourceList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章资源列表
     */
    requestEditResource() {
      const params = {
        ...this.formData,
        resourceId: this.currentRow._id,
      };
      this.isEditLoading = true;
      api
        .PutResource(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideResourceModal();
          this.requestResourceList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章资源
     */
    requestDeleteResource() {
      this.isDeleteLoading = true;
      api
        .DeleteResource({ resourceId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestResourceList();
        })
        .catch(() => {
          this.isDeleteLoading = false;
        });
    },

    /**
     * @desc 分页点击
     */
    handleChangePage(page) {
      this.page = page;
      this.requestResourceList();
    },

    /**
     * @desc 清空表单值
     */
    handleClearFormData() {
      this.formData = {};
    },

    /**
     * @desc 回显表单值
     */
    handleRecoveryFormData(data) {
      this.formData = {
        name: data.name,
        poster: data.poster,
        resourceTypeId: [data.resourceTypeId],
      };
    },

    /**
     * @desc 新增文章资源
     */
    handleAddResource() {
      this.editMode = 'add';
      this.handleShowResourceModal();
    },

    /**
     * @desc 编辑文章资源
     */
    handleEditResource(row) {
      this.editMode = 'edit';
      this.currentRow = row;
      this.handleRecoveryFormData(row);
      this.handleShowResourceModal();
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.resourceTypeId) {
        this.$toast.error('请选择资源类别');
        return false;
      } else if (!this.formData.name) {
        this.$toast.error('请填写资源名称');
        return false;
      }
      return true;
    },

    /**
     * @desc 提交文章资源表单
     */
    handleSubmitResource() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditResource();
      } else {
        this.requestAddResource();
      }
    },

    /**
     * @desc 显示文章资源表单弹框
     */
    handleShowResourceModal() {
      this.isShowResourceModal = true;
    },

    /**
     * @desc 隐藏文章资源表单弹框
     */
    handleHideResourceModal() {
      this.isShowResourceModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除文章资源弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章资源弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
