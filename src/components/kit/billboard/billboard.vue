<template>
  <div class="billboard" :style="{ 'background-image': `url(${bgSrc})`, 'background-position': `center ${bgPosition}px` }">
    <div class="billboard-box">
      <div class="billboard-inner">
        <h1 class="billboard-inner-slogan">不积跬步，无以至千里</h1>
        <p class="billboard-inner-slogan-sub">No step, no mile.</p>
      </div>
    </div>
  </div>
</template>

<script src="./billboard.js"></script>

<style lang="less" scoped>
@billboardHeight: 240px;
.billboard {
  position: relative;
  width: 100%;
  height: @billboardHeight;
  text-align: center;
  // background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  &-box {
    height: @billboardHeight;
    padding-top: @heightHeader;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    display: inline-table;
  }
  &-inner {
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
  }
  &-inner-slogan {
    font-size: 20px;
    margin-bottom: 10px;
    color: #fff;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  }
  &-inner-slogan-sub {
    background-color: rgba(0, 0, 0, 0.15);
    color: #fff;
    padding: 2px 8px;
    display: inline-block;
    border-radius: 5px;
  }
}
</style>
