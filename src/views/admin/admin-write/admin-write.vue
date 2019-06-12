<template>
  <div class="admin-write-wrap">
    admin-write
    <Tag closable>张</Tag>
    <input v-model="formData.title" class="write-input title" type="text" placeholder="标题: 月光下的奔跑" />
    <div class="z-row">
      <div class="z-col-12">
        <multiselect v-model="formData.category" :options="categoryList.slice(1)" track-by="name" label="name" :allow-empty="false" :close-on-select="true" :show-labels="false" placeholder="请选择文章分类"> </multiselect>
      </div>
      <div class="z-col-12">
        <multiselect
          v-model="formData.tag"
          :options="tagList"
          :multiple="true"
          track-by="name"
          label="name"
          :close-on-select="false"
          :show-labels="false"
          tag-placeholder="添加新标签"
          :taggable="true"
          placeholder="请填写文章标签"
        >
          <template slot="tag" slot-scope="props">
            <Tag theme="info" closable @close="props.remove(props.option)">{{props.option.name}}</Tag>
          </template>
        </multiselect>
      </div>
    </div>
    <input v-model="formData.poster"  class="write-input poster" type="text" placeholder="粘贴图片URL">

  </div>
</template>

<script src="./admin-write.js"></script>

<style lang="less" scoped>
.admin-write-wrap {
  input,
  select {
    width: 200px;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
    font-size: 16px;
    border: 1px solid @colorTextContent;
    outline: none;
    vertical-align: middle;
  }
  input {
    padding: 0 10px;
  }
  select {
    vertical-align: top;
  }

  .title {
    height: 40px;
    line-height: 40px;
    width: 100%;
    font-size: 18px;
  }
  .poster {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
