<template>
  <div class="mc-panel-group rad-row">
    <PanelCommon title="来电" icon-color="#40c9c6" @click="onClickPanel('newVisitis')">
      <i slot="icon" class="el-icon-service"></i>
      <template slot="number">
        <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
      </template>
    </PanelCommon>
    <PanelCommon title="消息" icon-color="#36a3f7" @click="onClickPanel('messages')">
      <i slot="icon" class="el-icon-info"></i>
      <template slot="number">
        <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
      </template>
    </PanelCommon>
    <PanelCommon title="包裹" icon-color="#f4516c" @click="onClickPanel('purchases')">
      <i slot="icon" class="el-icon-goods"></i>
      <template slot="number">
        <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
      </template>
    </PanelCommon>
    <PanelCommon title="待发" icon-color="#34bfa3" @click="onClickPanel('shoppings')">
      <i slot="icon" class="el-icon-time"></i>
      <template slot="number">
        <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
      </template>
    </PanelCommon>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import PanelCommon from "./panels/PanelCommon";

export default {
  components: { PanelCommon, CountTo },
  name: "McPanelGroup",
  methods: {
    onClickPanel(type) {
      console.log(type);
    }
  }
};
</script>

<style lang="scss" scoped>
.mc-panel-group {
  .panel-group {
    .card-panel-num {
      font-size: 20px;
    }
  }
}
</style>
