import Modal from '@/components/base/modal/';
import Btn from '@/components/base/btn/';

import api from '@/api/';
import webStore from '@/utils/storage';
import { validatorsExp } from '@/utils/validate';

const { mapGetters, mapActions } = Vuex;

export default {
  components: {
    Modal,
    Btn,
  },
  name: 'SignUp',
  data() {
    return {
      formData: {},
      isSignUpLoading: false,
    };
  },
  computed: {
    ...mapGetters('common', {
      isShowSignUpModal: 'getIsShowSignUpModal',
    }),
  },
  methods: {
    ...mapActions({
      toggleSignUpModal: 'common/toggleSignUpModal',
      handleChangeUserInfo: 'common/changeUserInfo',
    }),

    /**
     * @desc 请求 去注册
     */
    requestSingUp() {
      const { userName, phone, email, password } = this.formData;
      const params = {
        userName,
        phone,
        email,
        password,
      };
      this.isSignUpLoading = true;
      api
        .PostUserSignup(params)
        .then(res => {
          webStore.setUserInfo(res.result);
          this.handleChangeUserInfo(res.result);
          this.isSignUpLoading = false;
          this.$toast.success('注册成功');
          this.handleCloseModel();
        })
        .catch(() => {
          this.isSignUpLoading = true;
        });
    },

    /**
     * @desc 按钮点击事件 注册
     */
    singUp() {
      this.validateFormData().then(isvalid => {
        if (isvalid) {
          this.requestSingUp();
        }
      });
    },

    /**
     * @desc 按钮点击事件 去登陆
     */
    goToLogIn() {
      this.$store.dispatch('common/toggleSignUpModal', false);
      this.$store.dispatch('common/toggleSignInModal', true);
    },

    /**
     * @desc 校验表单数据是否符合要求
     */
    validateFormData() {
      const { userName, phone, email, password, confirmPassword } = this.formData;
      return new Promise(resolve => {
        if (!userName) {
          this.$toast.error('请填写昵称！');
          return resolve(false);
        }
        if (!validatorsExp.phone.test(phone)) {
          this.$toast.error('请正确填写手机号！');
          return resolve(false);
        }
        if (!validatorsExp.email.test(email)) {
          this.$toast.error('请正确填写邮箱！');
          return resolve(false);
        }
        if (!password) {
          this.$toast.error('请填写密码！');
          return resolve(false);
        }
        if (password.length < 6) {
          this.$toast.error('密码至少为 6 位');
          return resolve(false);
        }
        if (!confirmPassword) {
          this.$toast.error('请再次确认密码');
          return resolve(false);
        }
        if (password !== confirmPassword) {
          this.$toast.error('密码不一致');
          return resolve(false);
        }
        return resolve(true);
      });
    },

    /**
     * @desc 关闭弹框
     */
    handleCloseModel() {
      this.toggleSignUpModal(false);
    },
  },
};
