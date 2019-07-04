import Card from '@/components/base/card/';
import ZImage from '@/components/base/z-image/';
import ZVideo from '@/components/base/z-video/';
import MovieReviewsItem from './movie-reviews-item.vue';
import MovieInfoCard from './movie-info-card.vue';

import doubanApi from '@/api/api-douban';

export default {
  name: 'MovieDetail',
  components: {
    Card,
    ZImage,
    ZVideo,
    MovieReviewsItem,
    MovieInfoCard,
  },
  data() {
    return {
      isLoading: false,
      movieDetail: {},
    };
  },
  computed: {
    videoUrl() {
      const trailer_urls = this.movieDetail.trailer_urls;
      if (trailer_urls && trailer_urls.length > 0) {
        return trailer_urls[0];
      }
      return '';
    },
    videoPoster() {
      const trailers = this.movieDetail.trailers;
      if (trailers && trailers.length > 0) {
        return trailers[0].medium;
      }
      return '';
    },
  },
  mounted() {
    this.requestMovieDetail();
  },
  methods: {
    /**
     * @desc 请求详情
     */
    requestMovieDetail() {
      this.isLoading = true;
      doubanApi
        .DoubanMovieMovieDetail({ id: this.$route.params.movieId })
        .then(res => {
          this.isLoading = false;
          this.movieDetail = res;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
