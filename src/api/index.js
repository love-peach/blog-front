import request from '@/utils/request';

export default {
  /**
   * @desc 分类
   */

  // 获取文章分类列表
  GetCategory: (params, options) => request.get('/categories', params, options),

  // 新增文章分类
  PostCategory: (params, options) => request.post('/categories', params, options),

  // 修改文章分类
  PutCategory: (params, options) => request.put(`/categories/${params.categoryId}`, params, options),

  // 删除文章分类
  DeleteCategory: (params, options) => request.delete(`/categories/${params.categoryId}`, params, options),

  /**
   * @desc 标签
   */

  // 获取标签列表
  GetTag: (params, options) => request.get('/tags', params, options),

  // 新增标签
  PostTag: (params, options) => request.post('/tags', params, options),

  // 修改标签
  PutTag: (params, options) => request.put(`/tags/${params.tagId}`, params, options),

  // 删除标签
  DeleteTag: (params, options) => request.delete(`/tags/${params.tagId}`, params, options),

  /**
   * @desc 文章
   */

  // 获取文章列表
  GetBlogList: (params, options) => request.get('/blogs', params, options),

  // 获取文章列表
  GetBlogDetail: (params, options) => request.get(`/blogs/${params.blogId}`, params, options),

  // 发布文章
  PostBlog: (params, options) => request.post('/blogs', params, options),

  // 修改文章
  PutBlog: (params, options) => request.put(`/blogs/${params.blogId}`, params, options),

  // 删除文章
  DeleteBlog: (params, options) => request.delete(`/blogs/${params.blogId}`, params, options),

  /**
   * @desc 用户
   */

  // 用户 - 获取用户列表
  GetUserList: (params, options) => request.get('/users', params, options),

  // 新增
  PostUser: (params, options) => request.post('/users/signup', params, options),

  // 用户 - 修改
  PutUser: (params, options) => request.put(`/users/${params.userId}`, params, options),

  // 用户 - 删除
  DeleteUser: (params, options) => request.delete(`/users/${params.userId}`, params, options),

  // 用户 - 注册
  PostUserSignup: (params, options) => request.post('/users/signup', params, options),

  // 用户 - 登陆
  PostUserLogin: (params, options) => request.post('/users/signin', params, options),

  // 用户 - 登出
  PostUserSignout: (params, options) => request.post('/users/signout', params, options),

  /**
   * @desc 资源分类
   */

  // 获取资源分类列表
  GetResourceType: (params, options) => request.get('/resourceTypes', params, options),

  // 新增资源分类
  PostResourceType: (params, options) => request.post('/resourceTypes', params, options),

  // 修改资源分类
  PutResourceType: (params, options) => request.put(`/resourceTypes/${params.resourceTypeId}`, params, options),

  // 删除资源分类
  DeleteResourceType: (params, options) => request.delete(`/resourceTypes/${params.resourceTypeId}`, params, options),

  /**
   * @desc 资源
   */

  // 获取资源列表
  GetResource: (params, options) => request.get('/resources', params, options),

  // 新增资源
  PostResource: (params, options) => request.post('/resources', params, options),

  // 修改资源
  PutResource: (params, options) => request.put(`/resources/${params.resourceId}`, params, options),

  // 删除资源
  DeleteResource: (params, options) => request.delete(`/resources/${params.resourceId}`, params, options),
};
