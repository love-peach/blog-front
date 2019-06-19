<template>
  <ZPanel title="文章管理">
    <template v-slot:headerRight>
      <Pagenation :all="pageTotal" :cur="page" :callback="changePage" />
    </template>
    <ZTable :columns="columns" :data="tableData" :loading="isLoading" />
    <Pagenation :all="pageTotal" :cur="page" :callback="changePage" style="margin-top: 20px;" />
  </ZPanel>
</template>

<script src="./admin-article.js"></script>
