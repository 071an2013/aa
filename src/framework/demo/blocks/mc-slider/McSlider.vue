<template>
  <div class="mc-slider">
    <el-carousel :interval="5000" arrow="always" :type="sliderType" :key="sliderType">
      <el-carousel-item>
        <img src="./images/01.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/02.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/03.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/04.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="./images/05.jpg" />
      </el-carousel-item>
    </el-carousel>
    <div style="margin-top:10px;">
      选择类型：
      <el-select v-model="sliderType" size="small">
        <el-option label="默认" value="default"></el-option>
        <el-option label="卡片式" value="card"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "McSlider",
  data() {
    return {
      sliderType: "default"
    };
  },
  created() {},
  methods: {}
};
</script>


<style lang="scss" scoped>
.mc-slider {
  /deep/ .el-carousel__container {
    height: 400px;
  }
  img {
    width: 100%;
    height: 100%;
    border: solid 1px #eee;
    box-sizing: border-box;
  }
}
</style>
