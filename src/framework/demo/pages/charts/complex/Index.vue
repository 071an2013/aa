<template>
  <div class="cmp-wrapper">
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">雷达图</div>
        <radar-chart></radar-chart>
      </basic-container>
      <basic-container>
        <div slot="header-left">仪表盘</div>
        <gauge-chart></gauge-chart>
      </basic-container>
    </div>
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">漏斗</div>
        <funnel-chart></funnel-chart>
      </basic-container>
      <div></div>
    </div>
  </div>
</template>


<script>
import GaugeChart from "./../../../blocks/mc-gauge-chart/index.js";
import RadarChart from "./../../../blocks/mc-radar-chart/index.js";
import FunnelChart from "./../../../blocks/mc-funnel-chart/index.js";

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
    GaugeChart,
    RadarChart,
    FunnelChart
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
