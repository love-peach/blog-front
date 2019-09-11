<template>
  <div class="z-container">
    <div class="z-row">
      <div class="z-col-sm-45">
        <ZVideo :src="videoUrl" :poster="videoPoster" />
        <div class="movie-brief" v-loading="isLoading">
          <h2 class="movie-brief-title">
            {{ movieDetail.original_title }} <span class="movie-brief-year">({{ movieDetail.year }})</span>
          </h2>
          <p class="movie-brief-introduce">{{ movieDetail.summary }}</p>
        </div>
        <ul class="movie-reviews-wrap" v-loading="isLoading">
          <MovieReviewsItem v-for="review in movieDetail.popular_reviews" :key="review.id" :review="review" />
        </ul>
      </div>

      <div class="z-col-sm-15" v-loading="isLoading">
        <MovieInfoCard :movieDetail="movieDetail" />
      </div>
    </div>
  </div>
</template>

<script src="./movie-detail.js"></script>
<style src="./movie-detail.less" lang="less" scoped></style>
