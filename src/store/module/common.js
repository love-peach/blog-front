import api from '@/api/';

const common = {
  namespaced: true,
  state: {
    categoryList: [],
    blogResult: {},
    showSignInModal: false,
    showSignUpModal: false,
    userInfo: {},
  },
  getters: {
    getBlogResult: state => state.blogResult,
    getCategoryList: state => state.categoryList,
    getCategoryIdByValue: state => value => {
      return value ? state.categoryList.filter(item => item.value === value)[0]._id : '';
    },
    getIsShowSignInModal: state => state.showSignInModal,
    getIsShowSignUpModal: state => state.showSignUpModal,
    getUserInfo: state => state.userInfo,
  },
  mutations: {
    setCatgoryList(state, data) {
      state.categoryList = data;
    },
    setBlogResult(state, data) {
      state.blogResult = data;
    },
    setSignInModal(state, isShow) {
      state.showSignInModal = isShow;
    },
    setSignUpModal(state, isShow) {
      state.showSignUpModal = isShow;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    },
  },
  actions: {
    async getCategoryList({ commit }) {
      const { result } = await api.GetBlogCategory();
      commit('setCatgoryList', result);
    },
    toggleSignInModal({ commit }, isShow) {
      commit('setSignInModal', isShow);
    },
    toggleSignUpModal({ commit }, isShow) {
      commit('setSignUpModal', isShow);
    },
    changeUserInfo({ commit }, data) {
      commit('setUserInfo', data);
    },
  },
};

export default common;
