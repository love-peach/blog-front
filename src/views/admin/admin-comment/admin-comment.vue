<template>
  <div>
    <ZPanel>
      <AdminCommentFilter>
        <template v-slot:default="slotProps">
          <Btn theme="info" @click="handleSearch(slotProps.formData)" :loading="isLoading">搜索</Btn>
        </template>
      </AdminCommentFilter>
    </ZPanel>
    <ZPanel title="评论管理">
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowReplyModal" @close="handleHideReplyModal" width="50%">
      <div slot="body">
        <ZTable :columns="columnsRepay" :data="currentRow.reply" />
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteCommentModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除吗？删除后，不可恢复！</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="handleConfirmDelete">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./admin-comment.js"></script>
