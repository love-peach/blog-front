import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';

import api from '@/api/';

export default {
  name: 'AdminTag',
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
      isShowTagModal: false,
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
          title: '属性值',
          key: 'value',
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
                      this.handleEditTag(params.row);
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
    this.requestTagList();
  },
  methods: {
    /**
     * @desc 请求 获取标签列表
     */
    requestTagList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      api
        .GetTag(params)
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
     * @desc 请求 新增标签
     */
    requestAddTag() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      api
        .PostTag(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideTagModal();
          this.requestTagList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditTag() {
      const params = {
        ...this.formData,
        tagId: this.currentRow._id,
      };
      this.isEditLoading = true;
      api
        .PutTag(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideTagModal();
          this.requestTagList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteTag() {
      this.isDeleteLoading = true;
      api
        .DeleteTag({ tagId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestTagList();
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
      this.requestTagList();
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
     * @desc 新增标签
     */
    handleAddTag() {
      this.editMode = 'add';
      this.handleShowTagModal();
    },

    /**
     * @desc 编辑标签
     */
    handleEditTag(row) {
      this.editMode = 'edit';
      this.currentRow = row;
      this.handleRecoveryFormData(row);
      this.handleShowTagModal();
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      if (!this.formData.name) {
        this.$toast.error('请填写标签名称');
        return false;
      } else if (!this.formData.value) {
        this.$toast.error('请填写标签属性值');
        return false;
      }
      return true;
    },

    /**
     * @desc 提交标签表单
     */
    handleSubmitTag() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditTag();
      } else {
        this.requestAddTag();
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowTagModal() {
      this.isShowTagModal = true;
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideTagModal() {
      this.isShowTagModal = false;
      this.handleClearFormData();
    },

    /**
     * @desc 显示删除标签弹框
     */
    handleShowDeleteModal() {
      this.isShowDeleteModal = true;
    },

    /**
     * @desc 隐藏删除标签弹框
     */
    handleHideDeleteModal() {
      this.isShowDeleteModal = false;
    },
  },
};
