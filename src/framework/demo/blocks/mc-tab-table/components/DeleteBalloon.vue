<template>
  <el-popover placement="bottom" width="200" v-model="visible">
    <p style="padding:10px 0 15px 0;text-align:center;">确认要删除当前项吗？</p>
    <div style="text-align: center; margin: 0">
      <el-button size="mini" type="danger" @click="handleHide(1)" round>确认</el-button>
      <el-button size="mini" @click="handleHide(0)" round>关闭</el-button>
    </div>
    <el-button type="text" size="mini" v-if="action === 'action'" slot="reference">删除</el-button>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  props: {
    action: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    tabKey: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleHide(code) {
      if (parseInt(code) === 1) {
        this.$emit("handleRemove", this.index, this.tabKey);
      }
      this.visible = false;
    }
  }
};
</script>
