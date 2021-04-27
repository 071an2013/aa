<template>
  <div class="cmp-wrapper">
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">饼加环</div>
        <pie-chart></pie-chart>
      </basic-container>
      <basic-container>
        <div slot="header-left">环</div>
        <ring-chart></ring-chart>
      </basic-container>
    </div>
  </div>
</template>


<script>
import PieChart from "@/framework/demo/blocks/mc-pie-chart/index.js";
import RingChart from "@/framework/demo/blocks/mc-ring-chart/index.js";

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
    PieChart,
    RingChart
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
