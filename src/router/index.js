import routes from './routes';
import store from '@/store/';

const scrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return {
      selector: to.hash,
    };
  }
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
};

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    scrollBehavior,
    routes: routes,
  });

const router = createRouter();

router.beforeEach(async (to, from, next) => {
  const categoryList = store.getters['common/getCategoryList'];
  if (categoryList.length === 0) {
    await store.dispatch('common/getCategoryList');
  }
  next();
});
export default router;
