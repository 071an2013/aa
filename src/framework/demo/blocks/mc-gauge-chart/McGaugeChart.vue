<template>
  <div class="mc-gauge-chart">
    <ve-gauge :data="chartData" :settings="chartSettings"></ve-gauge>
  </div>
</template>

<script>
import VeGauge from "v-charts/lib/gauge";

export default {
  components: { VeGauge },
  name: "McGaugeChart",
  data() {
    return {
      initValue: 40,
      chartSettings: {
        dimension: "type",
        metrics: "value"
      },
      chartData: {
        columns: ["type", "a", "b", "value"],
        rows: [{ type: "速度", value: this.initValue, a: 1, b: 2 }]
      }
    };
  },
  created() {
    this.runValue(5, 80);
  },
  watch: {
    initValue: function() {
      this.chartData.rows[0].value = this.initValue;
    }
  },
  methods: {
    runValue(minNum, maxNum) {
      const _this = this;
      let timeOut = setTimeout(() => {
        if (_this.initValue >= minNum && _this.initValue <= maxNum) {
          _this.initValue += Math.floor((Math.random() - 0.3) * 3);
          _this.runValue(5, 80);
        } else {
          clearTimeout(timeOut);
        }
      }, 100);
    }
  }
};
</script>

<style>
.mc-gauge-chart {
}
</style>
