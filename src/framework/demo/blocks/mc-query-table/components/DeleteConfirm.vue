<template>
  <div class="delete-confirm-wrapper">
    <el-popover placement="bottom" v-model="visible">
      <div class="message-title">
        <i class="el-icon-question"></i>
        确认框
      </div>
      <div class="message-body">
        <div class="message">
          <slot name="message" />
        </div>
        <div>
          <el-button type="danger" size="mini" @click="onConfirm()">确认</el-button>
          <el-button size="mini" @click="visible = false">关闭</el-button>
        </div>
      </div>
      <slot slot="reference"></slot>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.delete-confirm-wrapper {
  display: inline-block;
  margin-right: 5px;
}
.message-title {
  border-bottom: solid 1px #eee;
  padding-bottom: 0.2em;
  color: #aaa;
}
.message-body {
  text-align: center;
  .message {
    line-height: 3.5em;
  }
}
</style>
