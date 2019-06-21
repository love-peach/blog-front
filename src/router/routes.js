const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');

const HomePage = () => import(/* webpackChunkName: 'HomePage' */ '@/views/home/');
const LoginPage = () => import(/* webpackChunkName: 'LoginPage' */ '@/views/login/');

const BlogContainer = () => import(/* webpackChunkName: 'BlogContainer' */ '@/views/blog/blog-container/');
const BlogContentList = () => import(/* webpackChunkName: 'BlogContentList' */ '@/views/blog/blog-content-list/');
const BlogContentDetail = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-content-detail/');
const BlogSideDetail = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-side-detail/');
const BlogSideList = () => import(/* webpackChunkName: 'BlogContentDetail' */ '@/views/blog/blog-side-list/');

const Resource = () => import(/* webpackChunkName: 'Resource' */ '@/views/resource/');

const AdminLayout = () => import(/* webpackChunkName: 'AdminLayout' */ '@/components/framework/admin-layout/');
const AdminHome = () => import(/* webpackChunkName: 'AdminHome' */ '@/views/admin/home/');
const AdminWrite = () => import(/* webpackChunkName: 'AdminWrite' */ '@/views/admin/admin-write/');
const AdminArticle = () => import(/* webpackChunkName: 'AdminArticle' */ '@/views/admin/admin-article/');
const AdminCatgory = () => import(/* webpackChunkName: 'AdminCatgory' */ '@/views/admin/admin-category/');
const AdminTag = () => import(/* webpackChunkName: 'AdminTag' */ '@/views/admin/admin-tag/');
const AdminResourceType = () => import(/* webpackChunkName: 'AdminResourceType' */ '@/views/admin/admin-resource-type/');
const AdminResource = () => import(/* webpackChunkName: 'AdminResource' */ '@/views/admin/admin-resource/');
const AdminUser = () => import(/* webpackChunkName: 'AdminUser' */ '@/views/admin/admin-user/');

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
      {
        path: '/resources',
        name: '前端资源',
        component: Resource,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: '管理后台-首页',
        component: AdminHome,
      },
      {
        path: 'write',
        name: '写文章',
        component: AdminWrite,
      },
      {
        path: 'write/:blogId',
        name: '编辑文章',
        component: AdminWrite,
      },
      {
        path: 'article',
        name: '文章管理',
        component: AdminArticle,
      },
      {
        path: 'category',
        name: '文章分类管理',
        component: AdminCatgory,
      },
      {
        path: 'tag',
        name: '文章标签管理',
        component: AdminTag,
      },
      {
        path: 'resourceType',
        name: '前端资源类别管理',
        component: AdminResourceType,
      },
      {
        path: 'resource',
        name: '前端资源管理',
        component: AdminResource,
      },
      {
        path: 'user',
        name: '用户管理',
        component: AdminUser,
      },
    ],
  },
];
