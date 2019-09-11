import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

import api from '@/api/';

export default {
  name: 'AdminResourceType',
  components: {
    ZPanel,
    ZTable,
    Pagenation,
    Modal,
    Btn,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      tableData: [],
      isLoading: false,
      isAddLoading: false,
      isEditLoading: false,
      isDeleteLoading: false,
      currentRow: {},
      isShowDeleteModal: false,
      isShowResourceTypeModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
        },
        {
          title: '名称',
          key: 'name',
          align: 'left',
        },
        {
          title: '创建时间',
          render: (h, params) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.createdAt, 'YYYY-MM-DD HH:MM'));
          },
        },
        {
          title: '修改时间',
          render: (h, params) => {
            return h('div', this.$options.filters.dateFormatFilter(params.row.updatedAt, 'YYYY-MM-DD HH:MM'));
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
                    theme: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.handleEditResourceType(params.row);
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
  },
  methods: {
    /**
     * @desc 请求 获取文章资源类别列表
     */
    requestResourceTypeList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      api
        .GetResourceType(params)
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
     * @desc 请求 新增文章资源类别列表
     */
    requestAddResourceType() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      api
        .PostResourceType(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideResourceTypeModal();
          this.requestResourceTypeList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章资源类别列表
     */
    requestEditResourceType() {
      const params = {
        ...this.formData,
        resourceTypeId: this.currentRow._id,
      };
      this.isEditLoading = true;
      api
        .PutResourceType(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideResourceTypeModal();
          this.requestResourceTypeList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章资源类别
     */
    requestDeleteResourceType() {
      this.isDeleteLoading = true;
      api
        .DeleteResourceType({ resourceTypeId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestResourceTypeList();
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
      this.requestResourceTypeList();
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
        value: data.value,
      };
    },

    /**
     * @desc 新增文章资源类别
     */
    handleAddResourceType() {
      this.editMode = 'add';
      this.handleShowResourceTypeModal();
    },

    /**
     * @desc 编辑文章资源类别
     */
    handleEditResourceType(row) {
      this.editMode = 'edit';
      this.currentRow = row;
      this.handleRecoveryFormData(row);
      this.handleShowResourceTypeModal();
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.name) {
        this.$toast.error('请填写资源类别名称');
        return false;
      }
      return true;
    },

    /**
     * @desc 提交文章资源类别表单
     */
    handleSubmitResourceType() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditResourceType();
      } else {
        this.requestAddResourceType();
      }
    },

    /**
     * @desc 显示文章资源类别表单弹框
     */
    handleShowResourceTypeModal() {
      this.isShowResourceTypeModal = true;
    },

    /**
     * @desc 隐藏文章资源类别表单弹框
     */
    handleHideResourceTypeModal() {
      this.isShowResourceTypeModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除文章资源类别弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章资源类别弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
