<template>
  <div class="ranking z-container">
    <TitleBar title="豆瓣电影TOP250" />
    <div class="z-row" v-loading="isLoading">
      <template v-if="tableData.length > 0">
        <div class="z-col-sm-30" v-for="(item, index) in tableData" :key="item.id">
          <Card padding="0" borderRadius="5px">
            <div class="z-row">
              <div class="z-col-23">
                <router-link class="ranking-link" :to="{ path: `/movie/detail/${item.id}` }" target="_blank">
                  <img class="ranking-poster" :src="item.images.large" alt="" />
                </router-link>
              </div>
              <div class="z-col-37">
                <div class="ranking-info">
                  <div :class="`ranking-order ${page <= 1 && index <= 2 ? 'ranking-order-bg-error' : 'ranking-order-bg-info'}`">
                    <span class="ranking-order-number">{{ (page - 1) * limit + index + 1 }}</span>
                  </div>
                  <router-link :to="{ path: `/movie/detail/${item.id}` }" target="_blank" class="ranking-info-title">{{ item.title }}</router-link>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">导演</label>
                    <span>{{ item.directors | arrayFormat }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">原名</label>
                    <span>{{ item.original_title }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">年代</label>
                    <span>{{ item.year }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">片长</label>
                    <span>{{ item.durations.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">类型</label>
                    <span>{{ item.genres.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">主演</label>
                    <span>{{ item.casts | arrayFormat }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-actor">
                    <label for="">上映日期</label>
                    <span>{{ item.pubdates.join(' / ') }}</span>
                  </p>
                  <p class="ranking-info-item ranking-info-score">
                    <label for="">评分</label>
                    <ScoreStart :value="item.rating ? item.rating.average : 0" />
                    <span class="ranking-info-score-amount">（{{ item.collect_count }}人评价）</span>   
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </template>
      <CardNoData v-else />
    </div>
    <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
  </div>
</template>

<script>
import TitleBar from '@/components/kit/title-bar/';
import Card from '@/components/base/card/';
import Pagenation from '@/components/base/pagenation/';
import CardNoData from '@/components/kit/card-no-data/';
import doubanApi from '@/api/api-douban';
import ScoreStart from '@/components/base/score-start/';

export default {
  name: 'MovieTop250',
  components: {
    TitleBar,
    Card,
    Pagenation,
    CardNoData,
    ScoreStart,
  },
  data() {
    return {
      page: 1,
      limit: 20,
      pageTotal: 0,
      isLoading: false,
      tableData: [],
    };
  },
  mounted() {
    this.requestTop250();
  },
  filters: {
    arrayFormat(array) {
      return array.map(item => item.name).join(' / ');
    },
  },
  methods: {
    /**
     * @desc 请求top250
     */
    requestTop250() {
      const params = {
        count: this.limit,
        start: (this.page - 1) * this.limit,
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

    /**
     * @desc 分页
     */
    handleChangePage(page) {
      this.page = page;
      this.requestTop250();
    },
  },
};
</script>

<style src="./movie-top-250.less" lang="less" scoped></style>
