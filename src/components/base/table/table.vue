<template>
  <table :class="`${prefixCls}`" v-loading="loading">
    <tbody>
      <tr>
        <th v-for="(col, colIndex) in columns" :key="colIndex" :style="col | stylesTh">
          {{ col.title }}
        </th>
      </tr>
      <template v-if="data && data.length > 0">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" :class="`${prefixCls}-tr`">
          <td v-for="(col, colIndex) in columns" :key="colIndex" :style="col | stylesTd">
            <render-td v-if="typeof col.render === 'function'" :index="colIndex" :render="col.render" :row="row" :column="col"></render-td>
            <span v-else-if="col.type === 'index'">{{ rowIndex + 1 }}</span>
            <span v-else>{{ row[col.key] }}</span>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td :colSpan="columns.length"><NoData style="height: 130px;" size="100px" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import NoData from '@/components/kit/no-data/';
import RenderTd from './render-td';

const prefixCls = 'z-table';

export default {
  name: 'ZTable',
  components: {
    NoData,
    RenderTd,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    height: Number,
    loading: Boolean,
  },
  data() {
    return {
      prefixCls,
    };
  },
  filters: {
    stylesTh(col) {
      return {
        width: col.width,
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        textAlign: col.align,
      };
    },
    stylesTd(col) {
      return {
        width: col.width,
        minWidth: col.minWidth,
        maxWidth: col.maxWidth,
        textAlign: col.align,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.z-table {
  width: 100%;
  border-right: 1px solid @colorBorder;
  border-bottom: 1px solid @colorBorder;
  background-color: #fff;
  th,
  td {
    text-align: center;
    border-left: 1px solid @colorBorder;
    border-top: 1px solid @colorBorder;
  }
  th {
    padding: 12px;
    background-color: @colorBg;
  }
  td {
    padding: 8px 12px;
  }
  &-tr:hover {
    background-color: #ebf7ff;
  }
}
</style>
