<template>
  <div class="mc-pie-chart">
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
  </div>
</template>

<script>
import VePie from "v-charts/lib/pie";
export default {
  components: { VePie },
  name: "McPieChart",
  data() {
    return {
      chartSettings: {
        level: [["1/1", "1/2", "1/3"], ["1/4", "1/5"]]
      },
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      }
    };
  }
};
</script>

<style>
.mc-pie-chart {
}
</style>
