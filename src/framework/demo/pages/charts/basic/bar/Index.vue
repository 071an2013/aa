<template>
  <div class="cmp-wrapper">
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">水平柱子</div>
        <mc-bar-chart></mc-bar-chart>
      </basic-container>
      <basic-container>
        <div slot="header-left">垂直柱子</div>
        <histogram-chart></histogram-chart>
      </basic-container>
    </div>
  </div>
</template>


<script>
import McBarChart from "@/framework/demo/blocks/mc-bar-chart/index.js";
import HistogramChart from "@/framework/demo/blocks/mc-histogram-chart/index.js";

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
    McBarChart,
    HistogramChart
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
