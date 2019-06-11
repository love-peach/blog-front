<template>
  <Card :padding="0">
    <NoData />
  </Card>
</template>

<script>
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

export default {
  name: 'CardNoData',
  components: {
    Card,
    NoData,
  },
};
</script>
