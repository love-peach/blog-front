<template>
  <div>
    <!-- <div style="height: 200px;background-color: #ccc;margin-top: -20px;position: relative;">
      <div class="more-type-wrap">
        <span>更多类型</span>
        <div class="more-type-content">
          <div class="concave-radius top-left position-right"></div>
          <div class="concave-radius top-right position-left"></div>
          <ul class="more-type">
            <li><a href="javascript:;">1</a></li>
            <li><a href="javascript:;">2</a></li>
            <li><a href="javascript:;">3</a></li>
            <li><a href="javascript:;">4</a></li>
            <li><a href="javascript:;">5</a></li>
            <li><a href="javascript:;">6</a></li>
            <li><a href="javascript:;">7</a></li>
            <li><a href="javascript:;">8</a></li>
            <li><a href="javascript:;">9</a></li>
          </ul>
        </div>
      </div>
    </div> -->

    <EbookSarch></EbookSarch>
    <div class="z-container">
      <EbookCategory></EbookCategory>
    </div>

    <router-view />
  </div>
</template>

<script>
import EbookSarch from '../components/ebook-search.vue';
import EbookCategory from '../components/ebook-category.vue';
export default {
  name: 'EbookContainer',
  components: {
    EbookSarch,
    EbookCategory,
  },
};
</script>

<style lang="less" scoped>
@radiusSize: 2px;
.more-type-wrap {
  position: absolute;
  height: 60px;
  top: 0;
  right: 100px;
  padding-top: 26px;
  cursor: pointer;
  &:hover {
    color: @colorInfo;
    .more-type-content {
      height: 40 * 3px + 20px;
      display: block;
    }
  }
  .more-type-content {
    height: 0;
    position: absolute;
    top: 100%;
    right: -10px;
    z-index: 100;
    overflow: hidden;
    transition: all 0.3s ease-out;
    cursor: default;
  }
  .concave-radius {
    height: 15px;
    width: 15px;
    position: absolute;
    top: 0;
  }
  .position-right {
    right: 0;
  }
  .position-left {
    left: 0;
  }
  .more-type {
    width: 65 * 5px;
    margin: 0 15px;
    background-color: #fff;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 @radiusSize*2 @radiusSize*2;
    li {
      display: inline-block;
      width: 65px;
    }
    a {
      display: block;
      padding: 0 10px;
      height: 32px;
      line-height: 32px;
      margin: 4px 5px;
      text-align: center;
      color: @colorTextTitle;
      border-radius: @radiusSize;
      &:hover {
        background-color: @colorSuccess;
        color: #fff;
      }
    }
  }
}
</style>
