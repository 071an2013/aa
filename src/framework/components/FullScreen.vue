<template>
  <div class="fullscreen-wrapper" @click="toggle">
    <el-tooltip effect="light" :content="isFullscreen ? '退出全屏' : '打开全屏模式'" placement="bottom">
      <i :class="[isFullscreen ? 'el-icon-close' : 'el-icon-full-screen']"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "FullScreen",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    document.addEventListener("fullscreenchange", event => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  },
  methods: {
    toggle() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fullscreen-wrapper {
  color: #fff;
  padding-left: 10px;
  cursor: pointer;
  //font-size: 18px;
  position: relative;
  top: -1px;
}
</style>