<template>
  <div>
    <ZPanel title="文章用户管理">
      <template v-slot:headerRight>
        <Btn theme="primary" @click="handleAddUser">新增用户</Btn>
      </template>
      <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
      <Pagenation :all="pageTotal" :cur="page" :callback="handleChangePage" style="margin-top: 20px;" />
    </ZPanel>

    <Modal v-if="isShowUserModal" @close="handleHideUserModal">
      <h3 slot="header">{{ editMode === 'edit' ? '修改用户' : '添加用户' }}</h3>
      <div slot="body">
        <input class="common-input" v-model="formData.userName" type="text" placeholder="昵称" />
        <input class="common-input" v-model="formData.phone" type="text" placeholder="手机号" />
        <input class="common-input" v-model="formData.email" type="text" placeholder="邮箱" />
        <input class="common-input" v-model="formData.password" type="password" :placeholder="editMode === 'edit' ? '新密码' : '密码'" />
        <input class="common-input" v-model="formData.confirmPassword" v-if="editMode === 'add'" type="password" placeholder="确认密码" />
      </div>
      <div slot="footer">
        <Btn theme="primary" long @click="handleSubmitUser">{{ editMode === 'edit' ? '确认修改' : '确认添加' }}</Btn>
      </div>
    </Modal>

    <Modal v-if="isShowDeleteModal" @close="handleHideDeleteModal">
      <h3 slot="header">确认删除?</h3>
      <div slot="body">
        <p>确认删除名为 {{ currentRow.userName }} 的用户吗?</p>
      </div>
      <div slot="footer">
        <Btn theme="error" long @click="requestDeleteUser">确认删除</Btn>
      </div>
    </Modal>
  </div>
</template>

<script src="./admin-user.js"></script>
