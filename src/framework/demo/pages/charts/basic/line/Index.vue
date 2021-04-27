<template>
  <div class="cmp-wrapper">
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">线形图</div>
        <line-chart></line-chart>
      </basic-container>
      <basic-container>
        <div slot="header-left">线形图 -- 带图表类型切换与下载功能</div>
        <normal-toggle-chart></normal-toggle-chart>
      </basic-container>
    </div>
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">线形图 -- 自定义图表类型</div>
        <diy-toggle-chart></diy-toggle-chart>
      </basic-container>
      <div></div>
    </div>
  </div>
</template>


<script>
import LineChart from "@/framework/demo/blocks/mc-line-chart/index.js";
import NormalToggleChart from "@/framework/demo/blocks/mc-normal-toggle-chart/index.js";
import DiyToggleChart from "@/framework/demo/blocks/mc-diy-toggle-chart/index.js";

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: {
    LineChart,
    NormalToggleChart,
    DiyToggleChart
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
