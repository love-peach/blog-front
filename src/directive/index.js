import directive from './directives';

const importDirective = Vue => {
  /**
   * loading 指令 v-loading="loading"
   */
  Vue.directive('loading', directive.loading);
};

export default importDirective;
