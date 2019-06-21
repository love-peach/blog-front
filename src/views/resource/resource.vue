<template>
  <div class="z-container">
    <template v-if="resourceList && resourceList.length > 0">
      <ZPanel :title="resource.name" v-for="resource in resourceList" :key="resource._id">
        <div class="z-row">
          <div class="z-col-6" v-for="resourceItem in resource.resource" :key="resourceItem._id">
            <a class="resource-item-wrap" :href="resourceItem.url" target="_blank">
              <h4 class="resource-header">
                  <img src="" alt="" class="header-img">
                  {{ resourceItem.name}}
              </h4>
              <p class="resource-dis">{{ resourceItem.desc}}</p>
            </a>
          </div>
        </div>
      </ZPanel>
    </template>

    <template v-else>
      <Card>
        <NoData />
      </Card>
    </template>
  </div>
</template>

<script>
import ZPanel from '@/components/base/panel/';
import Card from '@/components/base/card/';
import NoData from '@/components/kit/no-data/';

import api from '@/api/';

export default {
  name: 'Resource',
  components: {
    ZPanel,
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
        })
    },
  }
}
</script>
