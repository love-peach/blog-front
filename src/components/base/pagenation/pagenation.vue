<template>
  <div class="page-bar">
    <ul>
      <li v-if="totalEle">
        <a style="border: 0;"
          >共<i>{{ totalEle }}</i
          >条</a
        >
      </li>
      <li v-if="cur != 1"><a @click="callback(cur - 1)">上一页</a></li>
      <li v-else><a style="cursor: default">上一页</a></li>
      <li v-for="index in indexs" :key="index" :class="{ active: cur == index }">
        <a @click="btnClick(index)">{{ index }}</a>
      </li>
      <li v-if="cur != all"><a @click="callback(cur + 1)">下一页</a></li>
      <li v-else><a style="cursor: default">下一页</a></li>
      <li>
        <a
          >共<i>{{ all }}</i
          >页</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  props: {
    cur: {
      type: [String, Number],
      required: true,
    },
    totalEle: [String, Number],
    all: {
      type: [String, Number],
      required: true,
    },
    callback: {
      default() {
        return function callback() {
          // todo
        };
      },
    },
  },
  computed: {
    indexs() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 11) {
        if (this.cur > 5 && this.cur < this.all - 4) {
          left = this.cur - 5;
          right = this.cur + 4;
        } else {
          if (this.cur <= 5) {
            left = 1;
            right = 10;
          } else {
            right = this.all;
            left = this.all - 9;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  methods: {
    btnClick(page) {
      if (page !== this.cur) {
        this.callback(page);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-bar ul {
  text-align: center;
  font-size: 0;
}
.page-bar li {
  list-style: none;
  display: inline-block;
}
.page-bar li:first-child > a {
  margin-left: 0;
}
.page-bar a {
  border: 1px solid @colorBorder;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  font-size: 14px;
  line-height: 1.42857143;
  color: @colorInfo;
  cursor: pointer;
}
.page-bar a:hover {
  background-color: #fff;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: @colorInfo;
  border-color: @colorInfo;
}
.page-bar i {
  font-style: normal;
  color: @colorError;
  margin: 0 4px;
  font-size: 12px;
}
</style>
