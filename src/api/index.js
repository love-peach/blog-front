import request from '@/utils/request';

export default {
  // 获取文章分类列表
  GetBlogCategory: (params, options) => request.get('/categories', params, options),

  // 获取标签列表
  GetTagList: (params, options) => request.get('/tags', params, options),

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

  // 用户 - 注册
  PostUserSignup: (params, options) => request.post('/users/signup', params, options),

  // 用户 - 登陆
  PostUserLogin: (params, options) => request.post('/users/signin', params, options),
};
