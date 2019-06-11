const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');

const HomePage = () => import(/* webpackChunkName: 'HomePage' */ '@/views/home/');
const LoginPage = () => import(/* webpackChunkName: 'LoginPage' */ '@/views/login/');

const BlogContainer = () => import(/* webpackChunkName: 'BlogContainer' */ '@/views/blog/blog-container/');
const BlogContentList = () => import(/* webpackChunkName: 'BlogContentList' */ '@/views/blog/blog-content-list/');
const BlogContentDetail = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-content-detail/');
const BlogSideDetail = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-side-detail/');
const BlogSideList = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-side-list/');

export default [
  {
    path: '/',
    component: AppLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: HomePage,
      },
      {
        path: '/blog',
        component: BlogContainer,
        children: [
          {
            path: '',
            name: '全部文章',
            components: {
              default: BlogContentList,
              sidePart: BlogSideList,
            },
          },
          {
            path: ':category',
            name: '文章',
            components: {
              default: BlogContentList,
              sidePart: BlogSideList,
            },
          },
          {
            path: 'detail/:blogId',
            name: '文章详情',
            components: {
              default: BlogContentDetail,
              sidePart: BlogSideDetail,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
];
