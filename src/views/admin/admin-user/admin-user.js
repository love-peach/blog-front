import ZPanel from '@/components/base/panel/';
import ZTable from '@/components/base/table/';
import Btn from '@/components/base/btn/';
import Pagenation from '@/components/base/pagenation/';
import Modal from '@/components/base/modal/';
import { validatorsExp } from '@/utils/validate';

import api from '@/api/';

export default {
  name: 'AdminUser',
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
      isShowUserModal: false,
      editMode: 'add',
      formData: {},
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60,
        },
        {
          title: '头像',
          key: 'poster',
          width: '80px',
          render: (h, parama) => {
            return h('img', {
              attrs: {
                src: parama.row.avatarUrl,
              },
              style: {
                width: '80px',
              },
            });
          },
        },
        {
          title: '姓名',
          key: 'userName',
          align: 'left',
        },
        {
          title: '手机号',
          key: 'phone',
        },
        {
          title: '邮箱',
          key: 'email',
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
                      this.handleEditUser(params.row);
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
    this.requestUserList();
  },
  methods: {
    /**
     * @desc 请求 获取标签列表
     */
    requestUserList() {
      this.isLoading = true;
      const params = {
        page: this.page,
        limit: this.limit,
      };
      api
        .GetUserList(params)
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
    requestAddUser() {
      const params = {
        ...this.formData,
      };
      this.isAddLoading = true;
      api
        .PostUser(params)
        .then(() => {
          this.isAddLoading = false;
          this.$toast.success('添加成功！');
          this.handleHideUserModal();
          this.requestUserList();
        })
        .catch(() => {
          this.isAddLoading = false;
        });
    },

    /**
     * @desc 请求 修改文章标签
     */
    requestEditUser() {
      const params = {
        ...this.formData,
        userId: this.currentRow._id,
      };
      this.isEditLoading = true;
      api
        .PutUser(params)
        .then(() => {
          this.isEditLoading = false;
          this.$toast.success('修改成功！');
          this.handleHideUserModal();
          this.requestUserList();
        })
        .catch(() => {
          this.isEditLoading = false;
        });
    },

    /**
     * @desc 请求 删除文章标签
     */
    requestDeleteUser() {
      this.isDeleteLoading = true;
      api
        .DeleteUser({ userId: this.currentRow._id })
        .then(() => {
          this.isDeleteLoading = false;
          this.$toast.success('删除成功！');
          this.handleHideDeleteModal();
          this.requestUserList();
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
      this.requestUserList();
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
        userName: data.userName,
        phone: data.phone,
        email: data.email,
      };
    },

    /**
     * @desc 新增标签
     */
    handleAddUser() {
      this.editMode = 'add';
      this.handleShowUserModal();
    },

    /**
     * @desc 编辑标签
     */
    handleEditUser(row) {
      this.editMode = 'edit';
      this.currentRow = row;
      this.handleRecoveryFormData(row);
      this.handleShowUserModal();
    },

    /**
     * @desc 检查表单数据是否合格
     */
    handleCheckFormData() {
      const { userName, phone, email, password, confirmPassword } = this.formData;
      const isAddMode = this.editMode === 'add';
      if (!userName) {
        this.$toast.error('请填写昵称！');
        return false;
      }
      if (!validatorsExp.phone.test(phone)) {
        this.$toast.error('请正确填写手机号！');
        return false;
      }
      if (!validatorsExp.email.test(email)) {
        this.$toast.error('请正确填写邮箱！');
        return false;
      }
      if (!password) {
        this.$toast.error('请填写密码！');
        return false;
      }
      if (password.length < 6) {
        this.$toast.error('密码至少为 6 位');
        return false;
      }
      if (isAddMode && !confirmPassword) {
        this.$toast.error('请再次确认密码');
        return false;
      }
      if (isAddMode && password !== confirmPassword) {
        this.$toast.error('密码不一致');
        return false;
      }
      return true;
    },

    /**
     * @desc 提交标签表单
     */
    handleSubmitUser() {
      if (!this.handleCheckFormData()) {
        return;
      }
      if (this.editMode === 'edit') {
        this.requestEditUser();
      } else {
        this.requestAddUser();
      }
    },

    /**
     * @desc 显示标签表单弹框
     */
    handleShowUserModal() {
      this.isShowUserModal = true;
    },

    /**
     * @desc 隐藏标签表单弹框
     */
    handleHideUserModal() {
      this.isShowUserModal = false;
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
