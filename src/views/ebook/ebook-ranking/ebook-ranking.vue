<template>
  <div v-loading="isLoading" style="min-height: 300px;">
    <div class="z-container">
      <div class="z-row">
        <div class="z-col-xl-15 z-col-lg-20 z-col-sm-30" v-for="part in rankData" :key="`${part.title}-${$route.params.rankType}`">
          <EbookRankPart :dataSource="part"></EbookRankPart>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ebook-ranking.js"></script>
