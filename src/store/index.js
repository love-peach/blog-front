import actions from './actions';
import mutations from './mutations';

import common from './module/common';

Vue.use(Vuex);
const state = {
  count: 0,
};
export default new Vuex.Store({
  state,
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
  },
  modules: {
    common,
  },
});
