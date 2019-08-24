<template>
  <div class="page">
    <BillBoard />
    <div class="page-content">
      <section style="background-color: #fff;min-height: 300px;padding: 20px;">
        <div class="z-container">
          fefe
        </div>
      </section>

      <section style="min-height: 300px;padding: 20px;">
        <div class="z-container">
          homePage
        </div>
      </section>

      <section style="background-color: #ccc;min-height: 300px;padding: 20px;">
        <div class="z-container">
          homePage
        </div>
      </section>
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="less" scoped>
.page {
  margin-top: -@heightHeader - 20;
}
.page-content {
  position: relative;
  min-height: 500px;
  background-color: @colorBgBody;
}
</style>
