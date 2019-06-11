import routes from './routes';
import store from '@/store/';

const createRouter = () =>
  new VueRouter({
    mode: 'history',
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
