<template>
  <div v-loading="isLoading">
    <div class="z-container">
      <div class="z-row">
        <div class="z-col-40">
          <div style="background-color: #fff;clear:both;">
            <div class="z-row">
              <div class=" z-col-xs-30 hotlist-item" v-for="item in ebookHomeData.hotList" :key="item.bookId">
                <div class="row">
                  <div class="z-col-20">
                    <EbookPoster :dataSource="item" />
                  </div>
                  <div class="z-col-40">
                    <h2 class="hotlist-item-name" :title="item.name">{{ item.name }}</h2>
                    <p class="hotlist-item-author">{{ item.author }}</p>
                    <p class="hotlist-item-brief">{{ item.brief.replace(/\s+/g, '') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="z-col-20">
          <ZTable :columns="columnsLastRecord" :data="ebookHomeData.tjList" size="small" :showHeader="false" :border="false" />
        </div>

      </div>

      <div class="z-row">
        <div class="z-col-md-20 rank-wrap" v-for="(rank, index) in ebookHomeData.rankList" :key="index">
          <TitleBar :title="rank.category"></TitleBar>
          <div class="rank-top clearfix">
            <div class="rank-top-info fl">
              <router-link class="rank-top-info-link" :to="{ path: `/ebook/catalog/${rank.top.bookId}` }">
                <span class="rank-top-label-tj">推荐</span>
                {{ rank.top.name }}
              </router-link>
              <p class="rank-top-info-brief">{{ rank.top.brief }}</p>
            </div>
            <div class="rank-top-poster fl">
              <router-link class="rank-top-poster-link" :to="{ path: '/demo' }">
                <img :src="rank.top.poster" alt="" />
              </router-link>
              <span class="rank-top-poster-shadow"></span>
            </div>
          </div>
          <ZTable :columns="rankColumns" :data="rank.list" size="small" :showHeader="false" :border="false" :stripe="false" />
        </div>
      </div>

      <div class="z-row">
        <div class="z-col-md-40">
          <TitleBar :title="ebookHomeData.lastUpdateTitle"></TitleBar>
          <ZTable :columns="columnsLastUpdate" :data="ebookHomeData.lastUpdate" size="small" :showHeader="false" :border="false" />
        </div>
        <div class="z-col-md-20">
          <TitleBar :title="ebookHomeData.lastRecordTitle"></TitleBar>
          <ZTable :columns="columnsLastRecord" :data="ebookHomeData.lastRecord" size="small" :showHeader="false" :border="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="less" scoped>
.hotlist-item {
  // margin-top: 10px;
  // margin-bottom: 15px;
  margin: 15px 0;
  &-name {
    margin-top: 15px;
    color: @colorTextTitle;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-author {
    margin-top: 3px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-brief {
    font-size: 12px;
    margin-top: 5px;
    color: @colorTextContent;
    text-align: justify;
    overflow: hidden;
    height: 4.5em;
    color: @colorTextSub;
  }
}

.rank-wrap {
  margin-bottom: 15px;
}
.rank-top {
  background: #fff;
  padding: 15px 15px 20px;
  margin-top: -15px;
  &-info {
    margin-right: 100px;
    &-link {
      font-size: 18px;
      color: @colorTextTitle;
    }
    &-brief {
      margin-top: 5px;
      text-align: justify;
      height: 6em;
      overflow: hidden;
    }
  }
  &-label-tj {
    background-color: #bf2c24;
    color: #fff;
    display: inline-block;
    padding: 4px 3px;
    font-size: 12px;
    vertical-align: text-bottom;
    line-height: 1;
  }
  &-poster {
    position: relative;
    transform: perspective(60px) rotateY(-10deg);
    margin-left: -90px;
    border: 1px solid @colorBorder;
    border-right: 0;
    &:after {
      position: absolute;
      z-index: 2;
      top: 2%;
      left: 100%;
      width: 10%;
      height: 97%;
      content: ' ';
      transform: perspective(60px) rotateY(30deg);
      box-shadow: inset 0 0 5px #888;
      background-color: #fff;
      background-image: linear-gradient(90deg, #bbb 0.1px, transparent 0.1px);
      background-size: 0.4px 100%;
    }
    &-link {
      position: relative;
      z-index: 10;
      display: inline-block;
      transform: translateZ(50px);
      height: 117px;
      width: 70px;
      background: #e7e7e7;

      img {
        width: 70px;
        height: 117px;
      }
    }
    &-shadow {
      position: absolute;
      z-index: 1;
      top: 86%;
      left: 7px;
      width: 25px;
      height: 17px;
      content: '';
      -webkit-transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
      transform: perspective(74px) rotateX(-70deg) rotateY(-5deg);
      -webkit-box-shadow: 38px 0 5px 5px #adadad;
      box-shadow: 39px 0 5px 5px #adadad;
    }
  }
}
</style>
