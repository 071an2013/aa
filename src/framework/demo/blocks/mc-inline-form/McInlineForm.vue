<template>
  <div class="mc-inline-form">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formData.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formData.region" placeholder="活动区域">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "McInlineForm",
  data() {
    return {
      formData: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    onSubmit() {
      let myFormData = this.formData;
      alert("form submit: \n" + JSON.stringify(myFormData));
    }
  }
};
</script>


<style lang="scss" scoped>
.mc-inline-form {
}
</style>
