<template>
  <div>
    <ZPanel title="文章资源管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddResource">新增资源</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowResourceModal" @close="handleHideResourceModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改资源' : '添加资源' }}</h3>
      <div slot="body">
        <ZSelect v-model="formData.resourceTypeId" placeholder="请选择文章分类" :options="resourceTypeList" labelKey="name" valueKey="_id"></ZSelect>
        <input class="common-input" v-model="formData.name" type="text" placeholder="资源名称" />
        <input class="common-input" v-model="formData.url" type="text" placeholder="资源地址" />
        <textarea class="common-textarea" v-model="formData.desc" placeholder="资源描述" cols="30" rows="3"></textarea>
      </div>
      <div slot="footer">
        <Btn theme="primary" :loading="isAddLoading || isEditLoading" long @click="handleSubmitResource">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.name }} 的资源吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteResource">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./admin-resource.js"></script>
