<template>
  <div class="admin-write-wrap">
    <div>{{ formData }}</div>
    <div>{{ formData.poster }}</div>
    <input v-model="formData.title" class="title" type="text" placeholder="标题: 月光下的奔跑" />
    <div class="z-row">
      <div class="z-col-xl-6 z-col-lg-12">
        <ZSelect v-model="formData.category" placeholder="请选择文章分类" :options="categoryList.slice(1)" labelKey="name" valueKey="_id"></ZSelect>
      </div>
      <div class="z-col-xl-6 z-col-lg-12">
        <ZSelect v-model="formData.tag" placeholder="请填写文章标签" :options="tagList" multiple labelKey="name" valueKey="_id"></ZSelect>
      </div>
      <div class="z-col-xl-12">
        <div class="z-row">
          <div class="z-col-19">
            <input v-model="formData.poster" class="poster" type="text" placeholder="粘贴图片URL" />
          </div>
          <div class="z-col-5">
            <Upload action="/api/upload" :format="['png', 'jpeg', 'jpg']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-success="handleUploadSuccess">
              <Btn theme="info" icon="tag" style="margin:5px 0;height: 38px;" long>选择文件</Btn>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./admin-write.js"></script>

<style lang="less" scoped>
.admin-write-wrap {
  input {
    padding: 0 10px;
  }

  .title {
    width: 100%;
    font-size: 18px;
  }
  .poster {
    width: 100%;
  }
}
</style>
