<template>
  <div class="admin-content-wrap">
    <AdminHeader />
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/framework/admin-header/';

export default {
  name: 'AdminContent',
  components: {
    AdminHeader,
  },
};
</script>

<style lang="less" scoped>
.admin-content-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  .admin-content {
    display: flex;
    flex: 1;
    padding: 16px;
  }
}
</style>
