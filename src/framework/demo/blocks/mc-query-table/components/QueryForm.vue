<template>
  <div class="cmp-wrapper">
    <div class="form-container">
      <el-form :inline="true" :model="formData" size="small" class="query-form" ref="my-form">
        <el-form-item label="系统" prop="system">
          <el-select v-model="formData.system" placeholder="系统">
            <el-option label="全部" value="0"></el-option>
            <el-option label="促销" value="1"></el-option>
            <el-option label="商城" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="未读" value="1"></el-option>
            <el-option label="已读" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板" prop="template" v-show="isExpanded">
          <el-select v-model="formData.template" placeholder="模板">
            <el-option label="全部" value="0"></el-option>
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别" prop="level" v-show="isExpanded">
          <el-select v-model="formData.level" placeholder="级别">
            <el-option label="全部" value="0"></el-option>
            <el-option label="普通" value="1"></el-option>
            <el-option label="报警" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="唯一标识" prop="uid" v-show="isExpanded">
          <el-input v-model="formData.uid" placeholder="唯一标识"></el-input>
        </el-form-item>
        <el-form-item label="商户id" prop="merchantId" v-show="isExpanded">
          <el-input v-model="formData.merchantId" placeholder="商户id"></el-input>
        </el-form-item>
        <el-form-item :style="formActionsStyle">
          <el-button type="primary" @click="onQuery" icon="el-icon-search">查询</el-button>
          <el-button
            size="small"
            type="warning"
            @click="resetForm('my-form')"
            style="margin-left:0"
            icon="el-icon-remove-outline"
          >重置</el-button>
          <el-button v-if="isShouldExpandable" type="text" @click="toggleExpend">
            {{ formExpendText }}
            <i :class="formExpandIcon"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false, // 表单是否全部展开
      formData: {
        system: "",
        template: "",
        status: "",
        level: "",
        uid: "",
        merchantId: ""
      }
    };
  },
  computed: {
    isShouldExpandable() {
      return Object.keys(this.formData).length > 3;
    },
    formExpendText() {
      return this.isExpanded ? "收起" : "展开";
    },
    formExpandIcon() {
      return this.isExpanded ? "el-icon-arrow-up" : "el-icon-arrow-down";
    },
    formActionsStyle() {
      if (this.isExpanded && Object.keys(this.formData).length % 3 === 0) {
        return { width: "100%", textAlign: "right" };
      } else {
        return "";
      }
    }
  },
  methods: {
    onQuery() {
      this.$emit("query", this.formData);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toggleExpend() {
      this.isExpanded = !this.isExpanded;
    },
    getQuerys() {
      return this.formData;
    }
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
  .form-container {
    margin-bottom: 5px;
    .query-form {
      .el-form-item {
        display: inline-flex;
        width: (1/3) * 100%; // 表单项拆分成 3 列
        padding-right: 16px;
        margin-right: 0;
        /deep/ .el-form-item__label {
          width: auto; // 表单名称宽度，可设置固定值
        }
        /deep/ .el-form-item__content {
          flex: 1;
        }
        .el-input,
        .el-select {
          width: 100%;
        }
        &:nth-child(3n) {
          padding-right: 0;
        }
        &:last-child {
          padding-right: 0;
          margin-bottom: 0;
        }
      }
    }
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>