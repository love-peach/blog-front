const AppLayout = () => import(/* webpackChunkName: 'AppLayout' */ '@/components/framework/app-layout/');

const HomePage = () => import(/* webpackChunkName: 'HomePage' */ '@/views/home/');
const LoginPage = () => import(/* webpackChunkName: 'LoginPage' */ '@/views/login/');

const BlogList = () => import(/* webpackChunkName: 'BlogList' */ '@/views/blog/blog-list/');
const BlogDetail = () => import(/* webpackChunkName: 'BlogDetail' */ '@/views/blog/blog-detail/');

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

const MovieHome = () => import(/* webpackChunkName: 'MovieHome' */ '@/views/movie/home/');
const MovieTop250 = () => import(/* webpackChunkName: 'MovieTop250' */ '@/views/movie/movie-top-250/');
const MovieDetail = () => import(/* webpackChunkName: 'MovieDetail' */ '@/views/movie/movie-detail/');

// const EbookContainer = () => import(/* webpackChunkName: 'EbookContainer' */ '@/views/ebook/ebook-container/');
const EbookHome = () => import(/* webpackChunkName: 'EbookHome' */ '@/views/ebook/home/');
const EbookCategory = () => import(/* webpackChunkName: 'EbookCategory' */ '@/views/ebook/ebook-category/');
const EbookCatalog = () => import(/* webpackChunkName: 'EbookCatalog' */ '@/views/ebook/ebook-catalog/');
const EbookChapter = () => import(/* webpackChunkName: 'EbookChapter' */ '@/views/ebook/ebook-chapter/');
const EbookRanking = () => import(/* webpackChunkName: 'EbookRanking' */ '@/views/ebook/ebook-ranking/');
const EbookSearch = () => import(/* webpackChunkName: 'EbookSearch' */ '@/views/ebook/ebook-search/');

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
    ],
  },
  {
    path: '/blog',
    component: AppLayout,
    children: [
      {
        path: '',
        name: '全部文章',
        component: BlogList,
      },
      {
        path: ':category',
        name: '文章',
        component: BlogList,
      },
      {
        path: 'detail/:blogId',
        name: '文章详情',
        component: BlogDetail,
      },
    ],
  },
  {
    path: '/resources',
    component: AppLayout,
    children: [
      {
        path: '',
        name: '前端资源',
        component: Resource,
      },
    ],
  },
  {
    path: '/movie',
    component: AppLayout,
    children: [
      {
        path: '',
        name: '电影-首页',
        component: MovieHome,
      },
      {
        path: 'top250',
        name: 'top250',
        component: MovieTop250,
      },
      {
        path: 'detail/:movieId',
        name: '电影-详情',
        component: MovieDetail,
      },
    ],
  },
  {
    path: '/ebook',
    component: AppLayout,
    children: [
      {
        path: '',
        name: '电子书-首页',
        component: EbookHome,
      },
      {
        path: 'category/:categoryName',
        name: '电子书-分类',
        component: EbookCategory,
      },
      {
        path: 'catalog/:bookId',
        name: '电子书-章节目录信息',
        component: EbookCatalog,
      },
      {
        path: 'catalog/:bookId/chapter/:chapterId',
        name: '电子书-正文',
        component: EbookChapter,
      },
      {
        path: 'ranking/:rankType',
        name: '电子书-排行榜单',
        component: EbookRanking,
      },
      {
        path: 'search',
        name: '电子书-搜索',
        component: EbookSearch,
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
