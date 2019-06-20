import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

import api from '@/api/';

export default {
  name: 'AdminCategory',
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
      isShowCategoryModal: false,
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
        },
        {
          title: '属性值',
          key: 'value',
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
                      this.handleEditCategory(params.row);
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
    this.requestCategoryList();
  },
  methods: {
    /**
     * @desc 请求 获取文章分类列表
     */
    requestCategoryList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      api
        .GetCategory(params)
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
     * @desc 请求 新增文章分类列表
     */
    requestAddCategory() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      api
        .PostCategory(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideCategoryModal();
          this.requestCategoryList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章分类列表
     */
    requestEditCategory() {
      const params = {
        ...this.formData,
        categoryId: this.currentRow._id,
      };
      this.isEditLoading = true;
      api
        .PutCategory(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideCategoryModal();
          this.requestCategoryList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章分类
     */
    requestDeleteCategory() {
      this.isDeleteLoading = true;
      api
        .DeleteCategory({ categoryId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestCategoryList();
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
      this.requestCategoryList();
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
     * @desc 新增文章分类
     */
    handleAddCategory() {
      this.editMode = 'add';
      this.handleShowCategoryModal();
    },

    /**
     * @desc 编辑文章分类
     */
    handleEditCategory(row) {
      this.editMode = 'edit';
      this.currentRow = row;
      this.handleRecoveryFormData(row);
      this.handleShowCategoryModal();
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.name) {
        this.$toast.error('请填写分类名称');
        return false;
      } else if (!this.formData.value) {
        this.$toast.error('请填写分类属性值');
        return false;
      }
      return true;
    },

    /**
     * @desc 提交文章分类表单
     */
    handleSubmitCategory() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditCategory();
      } else {
        this.requestAddCategory();
      }
    },

    /**
     * @desc 显示文章分类表单弹框
     */
    handleShowCategoryModal() {
      this.isShowCategoryModal = true;
    },

    /**
     * @desc 隐藏文章分类表单弹框
     */
    handleHideCategoryModal() {
      this.isShowCategoryModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除文章分类弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除文章分类弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
