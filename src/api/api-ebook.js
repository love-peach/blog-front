import request from '@/utils/request';

export default {
  // 关键字查询书籍
  getBookByWd: (params, options) => request.get(`ebooks/search?wd=${params.wd}`, null, options),

  // 获取分类书籍
  getCategoryBook: (params, options) => request.get(`/ebooks/category/${params.categoryName}`, null, options),

  // 获取排行榜书籍
  getRankingBook: (params, options) => request.get(`/ebooks/rank/${params.rankType === 'all' ? '' : params.rankType}`, null, options),

  // 获取书籍信息
  getBookInfo: (params, options) => request.get(`/ebooks/info/${params.bookId}`, null, options),

  // 获取章节内容
  getChapter: (params, options) => request.get(`/ebooks/chapter/${params.bookId}/${params.chapterId}`, null, options),

  // 获取首页数据
  getHomeData: (params, options) => request.get('/ebooks/', null, options),
};
