<template>
  <div class="mc-step-form">
    <el-steps :space="200" :active="1" simple>
      <el-step title="填写转账信息" icon="el-icon-edit"></el-step>
      <el-step title="确认转账信息" icon="el-icon-view"></el-step>
      <el-step title="完成" icon="el-icon-check"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "McStepForm",

  data() {
    return {};
  },

  created() {},

  methods: {}
};
</script>

<style>
.mc-step-form {
}
</style>
