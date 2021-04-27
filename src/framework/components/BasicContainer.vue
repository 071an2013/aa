<template>
  <div class="basic-container" :class="theme">
    <!--窗口头部-->
    <div v-if="$slots['header-left'] || $slots['header-right']" class="basic-container-header">
      <!--左侧-->
      <div v-if="$slots['header-left']" class="basic-container-header-left">
        <slot name="header-left"></slot>
      </div>
      <!--右侧-->
      <div v-if="$slots['header-right']" class="basic-container-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <!--主内容区-->
    <div class="basic-container-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "basic-container",
  props: {
    theme: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
$borderRadius: 6px;
.basic-container {
  position: relative;
  margin-bottom: 20px;
  border-radius: $borderRadius;
  background-color: #ffffff;
  .basic-container-header {
    border-bottom: solid #f0f2f5 1px;
    padding: 10px 20px;
    overflow: overlay;
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;
    //background-color: #ccc;
    display: flex;
    .basic-container-header-left {
      flex: 1;
    }
    .basic-container-header-right {
      text-align: right;
      flex: 1;
    }
  }
  .basic-container-content {
    //background-color: #cfc;
    padding: 20px;
    overflow: auto;
  }
  &.raw {
    background-color: transparent;
    border-radius: 0;
    .basic-container-content {
      padding: 0;
    }
  }
}
</style>
