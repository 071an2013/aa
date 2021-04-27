<template>
  <div>
    <basic-container theme="raw">
      <PanelGroup />
    </basic-container>
    <basic-container>
      <LineChart />
    </basic-container>
    <div class="rad-row">
      <basic-container>
        <div slot="header-left">雷达图</div>
        <div slot="header-right">
          <i class="el-icon-more"></i>&nbsp;
          <i class="el-icon-refresh"></i>
        </div>
        <radar-chart />
      </basic-container>
      <basic-container>
        <div slot="header-left">仪表盘</div>
        <div slot="header-right">
          <i class="el-icon-more"></i>&nbsp;
          <i class="el-icon-refresh"></i>
        </div>
        <gauge-chart />
      </basic-container>
      <basic-container>
        <div slot="header-left">漏斗</div>
        <div slot="header-right">
          <i class="el-icon-more"></i>&nbsp;
          <i class="el-icon-refresh"></i>
        </div>
        <funnel-chart />
      </basic-container>
    </div>
  </div>
</template>

<script>
import LineChart from "@/framework/demo/blocks/mc-line-chart/index.js";
import PanelGroup from "@/framework/demo/blocks/mc-panel-group/index.js";
import GaugeChart from "@/framework/demo/blocks/mc-gauge-chart/index.js";
import RadarChart from "@/framework/demo/blocks/mc-radar-chart/index.js";
import FunnelChart from "@/framework/demo/blocks/mc-funnel-chart/index.js";

export default {
  name: "home",
  components: {
    LineChart,
    PanelGroup,
    GaugeChart,
    RadarChart,
    FunnelChart
  }
};
</script>
