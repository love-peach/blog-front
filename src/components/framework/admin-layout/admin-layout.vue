<template>
  <div class="admin-layout-wrap">
    <AdminSide />
    <AdminContent />
  </div>
</template>

<script>
import AdminSide from '@/components/framework/admin-side/';
import AdminContent from '@/components/framework/admin-content/';

export default {
  name: 'AdminLayout',
  components: {
    AdminSide,
    AdminContent,
  },
};
</script>

<style lang="less" scoped>
.admin-layout-wrap {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
