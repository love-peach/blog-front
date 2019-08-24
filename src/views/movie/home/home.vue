<template>
  <div>
    <div class="z-container">
      <MovieHomeList :title="beingShownData.title" :list="beingShownList" v-loading="isBeingShownLoading" />
      <MovieHomeList :title="rankingNewData.title" :list="rankingNewList" v-loading="isRankingNewLoading" />
      <MovieHomeList :title="rankingComingData.title" :list="rankingComingList" v-loading="isRankingComingLoading" />
      <MovieHomeList :title="ranking250Data.title" :list="ranking250List" v-loading="isRanking250Loading">
        <Button theme="success" :to="{ path: '/movie/top250' }" icon="danxuanfill">更多</Button>
      </MovieHomeList>
    </div>
  </div>
</template>

<script>
import Button from '@/components/base/btn/';
import MovieHomeList from './movie-home-list';
import doubanApi from '@/api/api-douban';

export default {
  name: 'MovieHome',
  components: {
    Button,
    MovieHomeList,
  },
  data() {
    return {
      isBeingShownLoading: false,
      isRankingNewLoading: false,
      isRankingComingLoading: false,
      isRanking250Loading: false,
      beingShownData: {},
      rankingNewData: {},
      rankingComingData: {},
      ranking250Data: {},
    };
  },
  computed: {
    beingShownList() {
      return this.beingShownData.subjects ? this.beingShownData.subjects.slice(0, 10) : [];
    },
    rankingNewList() {
      return this.rankingNewData.subjects ? this.rankingNewData.subjects.slice(0, 10) : [];
    },
    rankingComingList() {
      return this.rankingComingData.subjects ? this.rankingComingData.subjects.slice(0, 10) : [];
    },
    ranking250List() {
      return this.ranking250Data.subjects ? this.ranking250Data.subjects.slice(0, 10) : [];
    },
  },
  mounted() {
    this.requestBeingShown();
    this.requestRankingNew();
    this.requestRankingComing();
    this.requestRanking250();
  },
  methods: {
    /**
     * @desc 请求正在正在上映
     */
    requestBeingShown() {
      this.isBeingShownLoading = true;
      doubanApi
        .DoubanMovieBeingShown({ count: 10 })
        .then(res => {
          this.isBeingShownLoading = false;
          this.beingShownData = res;
        })
        .catch(() => {
          this.isBeingShownLoading = false;
        });
    },

    /**
     * @desc 请求新片榜
     */
    requestRankingNew() {
      this.isRankingNewLoading = true;
      doubanApi
        .DoubanMovieRankingNew({ count: 10 })
        .then(res => {
          this.isRankingNewLoading = false;
          this.rankingNewData = res;
        })
        .catch(() => {
          this.isRankingNewLoading = false;
        });
    },

    /**
     * @desc 请求250
     */
    requestRanking250() {
      this.isRanking250Loading = true;
      doubanApi
        .DoubanMovieRankingTop250({ count: 10 })
        .then(res => {
          this.isRanking250Loading = false;
          this.ranking250Data = res;
        })
        .catch(() => {
          this.isRanking250Loading = false;
        });
    },

    /**
     * @desc 请求即将上映
     */
    requestRankingComing() {
      this.isRankingComingLoading = true;
      doubanApi
        .DoubanMovieRankingComing({ count: 10 })
        .then(res => {
          this.isRankingComingLoading = false;
          this.rankingComingData = res;
        })
        .catch(() => {
          this.isRankingComingLoading = false;
        });
    },
  },
};
</script>
