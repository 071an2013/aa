<template>
  <div class="mc-diy-toggle-chart">
    <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    <div>
      选择图表类型:
      <el-select v-model="currentChartType" placeholder="请选择..." @change="changeType" size="mini">
        <el-option
          v-for="chartType in chartTypes"
          :key="chartType"
          :label="chartType"
          :value="chartType"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import VeChart from "v-charts/lib/chart";
import VeLine from "v-charts/lib/line";
import VeHistogram from "v-charts/lib/histogram";
import VeBar from "v-charts/lib/bar";
import VePie from "v-charts/lib/pie";
import VeRing from "v-charts/lib/ring";
import VeWaterfall from "v-charts/lib/waterfall";
import VeFunnel from "v-charts/lib/funnel";

export default {
  components: {
    VeLine,
    VeHistogram,
    VeBar,
    VePie,
    VeRing,
    VeWaterfall,
    VeFunnel,
    VeChart
  },
  name: "McDiyToggleChart",
  data() {
    let chartTypes = [
      "line",
      "histogram",
      "bar",
      "pie",
      "ring",
      "waterfall",
      "funnel"
    ];
    return {
      chartTypes: chartTypes,
      currentChartType: chartTypes[0],
      initIndex: 0,
      chartData: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1月1日", 访问用户: 1523 },
          { 日期: "1月2日", 访问用户: 1223 },
          { 日期: "1月3日", 访问用户: 2123 },
          { 日期: "1月4日", 访问用户: 4123 },
          { 日期: "1月5日", 访问用户: 3123 },
          { 日期: "1月6日", 访问用户: 7123 }
        ]
      },
      chartSettings: { type: chartTypes[0] }
    };
  },
  methods: {
    changeType: function(val) {
      this.chartSettings.type = val;
    }
  }
};
</script>

<style>
.mc-diy-toggle-chart {
}
</style>
