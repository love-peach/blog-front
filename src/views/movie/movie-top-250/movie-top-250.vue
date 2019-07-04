<template>
  <div>
    <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
  </div>
</template>

<script>
import doubanApi from '@/api/api-douban';
import Pagenation from '@/components/base/pagenation/';

export default {
  name: 'MovieTop250',
  components: {
    Pagenation,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      pageTotal: 0,
      isLoading: false,
      tableData: [],
    };
  },
  mounted() {
    this.request();
  },
  methods: {
    /**
     * @desc 请求top250
     */
    request() {
      const params = {
        count: this.limit,
        start: this.page - 1,
      };
      this.isLoading = true;
      doubanApi
        .DoubanMovieRankingTop250(params)
        .then(res => {
          this.isLoading = false;
          this.tableData = res.subjects;
          this.pageTotal = Math.ceil(res.total / res.count);
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err, 'err');
        });
    },
  },
};
</script>
