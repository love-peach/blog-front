import Modal from '@/components/base/modal/';
import Btn from '@/components/base/btn/';
import api from '@/api/';
import webStore from '@/utils/storage';

const { mapGetters, mapActions } = Vuex;

export default {
  components: {
    Modal,
    Btn,
  },
  name: 'SignIn',
  data() {
    return {
      formData: {
        account: '',
        password: '',
      },
      isLoginLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      isShowSignInModal: 'getIsShowSignInModal',
    }),
  },
  methods: {
    ...mapActions({
      toggleSignInModal: 'common/toggleSignInModal',
      handleChangeUserInfo: 'common/changeUserInfo',
    }),

    /**
     * @desc 请求 登录
     */
    requestLogin() {
      const params = {
        userName: this.formData.account,
        password: this.formData.password,
      };
      this.isLoginLoading = true;
      api
        .PostUserLogin(params)
        .then(res => {
          webStore.setUserInfo(res.result);
          this.handleChangeUserInfo(res.result);
          this.isLoginLoading = false;
          this.$toast.success('登录成功');
          this.handleCloseModel();
        })
        .catch(() => {
          this.isLoginLoading = false;
        });
    },

    /**
     * @desc 按钮点击事件 登录
     */
    login() {
      this.validateFormData().then(isvalid => {
        if (isvalid) {
          this.requestLogin();
        }
      });
    },

    /**
     * @desc 按钮点击事件 忘记密码
     */
    handleForgetPwd() {
      this.$router.push('/forget_pwd');
      this.$store.dispatch('common/toggleSignInModal', false);
      this.$store.dispatch('common/toggleSignUpModal', false);
    },

    /**
     * @desc 按钮点击事件 去注册
     */
    goToRegister() {
      this.$store.dispatch('common/toggleSignInModal', false);
      this.$store.dispatch('common/toggleSignUpModal', true);
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      return new Promise(resolve => {
        if (!this.formData.account) {
          this.$toast.error('请输入昵称');
          return resolve(false);
        }
        if (!this.formData.password) {
          this.$toast.error('请输入密码');
          return resolve(false);
        }
        return resolve(true);
      });
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.toggleSignInModal(false);
    },
  },
};
