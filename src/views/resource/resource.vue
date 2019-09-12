<template>
  <div class="z-container">
    <template v-if="resourceList && resourceList.length > 0">
      <div v-for="resource in resourceList" :key="resource._id">
        <TitleBar :title="resource.name"></TitleBar>
        <div class="z-row" v-if="resource.resource && resource.resource.length > 0">
          <div class="resource-item-wrap z-col-xl-12 z-col-lg-15 z-col-md-20 z-col-sm-30 z-col-xs-30" v-for="resourceItem in resource.resource" :key="resourceItem._id">
            <Card padding="0">
              <a class="resource-item-link no-img-placeholder-colorful no-img-placeholder-horizon" :href="resourceItem.url" target="_blank">
                <img :src="resourceItem.posterUrl" alt="" class="resource-item-poster" />
              </a>
              <div class="resource-info-wrap">
                <h4 class="resource-header">{{ resourceItem.name }}</h4>
                <p :title="resourceItem.desc || resourceItem.metaDesc" class="resource-dis">{{ resourceItem.desc || resourceItem.metaDesc }}</p>
              </div>
            </Card>
          </div>
        </div>
        <NoData v-else style="height: 220px;" />
      </div>
    </template>

    <template v-else>
      <Card>
        <NoData />
      </Card>
    </template>
  </div>
</template>

<script>
import TitleBar from '@/components/kit/title-bar/';
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

import api from '@/api/';

export default {
  name: 'Resource',
  components: {
    TitleBar,
    Card,
    NoData,
  },
  data() {
    return {
      isLoading: false,
      resourceList: [],
    };
  },
  mounted() {
    this.requestResourceList();
  },
  methods: {
    /**
     * @desc 请求 修改文章资源类别列表
     */
    requestResourceList() {
      this.isLoading = true;
      api
        .GetResourceType()
        .then(res => {
          this.resourceList = res.result;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.resource-item-wrap {
  position: relative;
  .resource-item-link {
    position: relative;
    display: block;
    padding-top: 60%;
  }
  .resource-item-poster {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .resource-info-wrap {
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid @colorBorder;
  }
  .resource-header {
    font-size: 16px;
    font-weight: normal;
  }
  .resource-dis {
    height: 3em;
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1.5;
    color: @colorTextSub;
  }
}
</style>
