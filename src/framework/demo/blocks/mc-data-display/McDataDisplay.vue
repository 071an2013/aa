<template>
  <div class="data-display">
    <el-row :gutter="0">
      <el-col v-for="(item,index) in option.data" :key="index" :xs="12" :sm="12" :md="option.span">
        <div class="item" :style="{color:option.color}">
          <h5 class="count">{{item.count}}</h5>
          <span class="splitLine" />
          <p class="title">{{item.title}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "McDataDisplay",
  data() {
    return {
      option: {
        span: 6,
        color: "#15A0FF",
        data: [
          {
            count: 100,
            title: "日活跃数"
          },
          {
            count: 800,
            title: "周活跃数"
          },
          {
            count: "3,000",
            title: "月活跃数"
          },
          {
            count: "20,000",
            title: "年活跃数"
          }
        ]
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  text-align: center;
}
.count {
  margin: 12px 0;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 32px;
  color: #15a0ff;
}
.title {
  color: #999;
}
.splitLine {
  display: block;
  margin: 0 auto;
  margin-bottom: 5px;
  width: 24px;
  height: 1px;
  background: #d3d6da;
}
</style>
