<template>
  <div class="form-dialog-wrapper">
    <!--对话框触发按钮-->
    <div class="form-dialog-trigger" @click="onShow">
      <slot></slot>
    </div>
    <!--对话框内容-->
    <el-dialog :title="dialogTitle" :visible.sync="visible" class="form-dialog">
      <el-form :model="formData" label-width="100px" ref="myForm">
        <el-form-item label="模板名称" prop="title">
          <el-input v-model="formData.title" placeholder="模板名称"></el-input>
        </el-form-item>
        <el-form-item label="通知紧急程度" prop="level">
          <el-select v-model="formData.level" placeholder="通知紧急程度">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="警告" value="警告"></el-option>
            <el-option label="紧急" value="紧急"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知展示类型" prop="displayType">
          <el-select v-model="formData.displayType" placeholder="通知展示类型">
            <el-option label="通知---标准" value="通知---标准"></el-option>
            <el-option label="通知---到货提醒" value="通知---到货提醒"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属系统" prop="system">
          <el-select v-model="formData.system" placeholder="所属系统">
            <el-option label="订单" value="订单"></el-option>
            <el-option label="金融" value="金融"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="约定参数" prop="params">
          <el-select v-model="formData.params" multiple placeholder="约定参数">
            <el-option label="ssu_id" value="ssu_id"></el-option>
            <el-option label="ding_time" value="ding_time"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联参数" prop="associateId">
          <el-select v-model="formData.associateId" placeholder="关联参数">
            <el-option label="无关联" value="无关联"></el-option>
            <el-option label="ssu_id" value="ssu_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm('myForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default() {
        return {};
      }
    },
    recordIndex: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "add"
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      // 此处定义表单默认字段值。
      formData: {
        title: "",
        level: "",
        displayType: "",
        associateId: "",
        params: "",
        system: ""
      }
    };
  },
  computed: {
    dialogTitle() {
      return (this.type === "add" ? "新建" : "编辑") + this.name;
    }
  },
  methods: {
    initForm() {
      this.formData = Object.assign({}, this.formData, this.record);
    },
    onShow() {
      this.initForm();
      this.visible = true;
    },
    onConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false;
        this.$emit(
          "confirm",
          this.formData,
          this.type === "add" ? -1 : this.recordIndex
        );
        this.visible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-dialog-wrapper {
  display: inline;
  margin-right: 5px;
  .form-dialog-trigger {
    display: inline-block;
  }
}
.form-dialog {
  /deep/ .el-select {
    display: block;
  }
}
</style>
