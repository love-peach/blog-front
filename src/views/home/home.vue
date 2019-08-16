<template>
  <div class="page">
    <BillBoard />
    <div class="page-content">
      <div style="background-color: #fff;min-height: 300px;padding: 20px;">
        <div class="z-container">
          fefe
        </div>
      </div>

      <div style="min-height: 300px;padding: 20px;">
        <div class="z-container">
          homePage
        </div>
      </div>
      <div style="background-color: #ccc;min-height: 300px;padding: 20px;">
        <div class="z-container">
          homePage
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="less" scoped>
@billboardHeight: 240px;
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
</style>
