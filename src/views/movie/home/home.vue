<template>
  <div>
    <div class="z-container">
      <MovieHomeList :title="beingShownData.title" :list="beingShownList" v-loading="isBeingShownLoading" />
      <MovieHomeList :title="rankingNewData.title" :list="rankingNewList" v-loading="isRankingNewLoading" />
      <MovieHomeList :title="rankingComingData.title" :list="rankingComingList" v-loading="isRankingComingLoading" />
    </div>
  </div>
</template>

<script>
import MovieHomeList from './movie-home-list';
import doubanApi from '@/api/api-douban';

export default {
  name: 'MovieHome',
  components: {
    MovieHomeList,
  },
  data() {
    return {
      isBeingShownLoading: false,
      isRankingNewLoading: false,
      isRankingComingLoading: false,
      beingShownData: {},
      rankingNewData: {},
      rankingComingData: {},
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
  },
  mounted() {
    this.requestBeingShown();
    this.requestRankingNew();
    this.requestRankingComing();
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
