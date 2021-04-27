<template>
  <div class="form-dialog-wrapper">
    <!--对话框触发按钮-->
    <div class="form-dialog-trigger" @click="onShow">
      <slot></slot>
    </div>
    <!--对话框内容-->
    <el-dialog :title="dialogTitle" :visible.sync="visible" class="form-dialog">
      <el-form :model="formData" :rules="formDataRules" label-width="120px" ref="myForm">
        <el-form-item label="id" prop="id" hidden="hidden">
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="formData.name" :disabled="type!='apply'"></el-input>
        </el-form-item>
        <el-form-item label="dubbo应用名称" prop="dubboName">
          <el-input v-model="formData.dubboName"></el-input>
        </el-form-item>
        <el-form-item label="http_domain" prop="httpName">
          <el-input v-model="formData.httpName" placeholder="不能以http开头"></el-input>
        </el-form-item>
        <el-form-item label="服务类型" prop="serviceType">
          <el-radio-group v-model="formData.serviceType">
            <el-radio v-for="item in serviceTypes" 
              :key="item.value"
              :label="item.value"
              :value="item.value">
              {{item.name}}
              </el-radio>
          </el-radio-group>
          <!-- <el-select
            v-model="formData.serviceType"
            placeholder="请选择服务类型"
          >
            <el-option
              v-for="item in serviceTypes"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select> -->

        </el-form-item>
        <el-form-item label="创建人" prop="creator" hidden="hidden">
          <el-input v-model="formData.creator"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('myForm')">{{ type != 'apply' ? '修改' : '申请' }}</el-button>
          <el-button @click="resetForm('myForm')">重置</el-button>
        </el-form-item>
      </el-form>
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
    refreshList: {
      type: Function,
      require: true
    },
    recordIndex: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "apply"
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
        id: "",
        name: "",
        dubboName: "",
        httpName: "",
        creator: "",
        serviceType: 1
      },
      formDataRules: {
        name: [
          {required: true, message: "请输入服务名称", trigger: "blur"},
          {min: 1, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur"}
        ],
        httpName:[
          {required: false, message: "不能以http开头", trigger: "blur"},
        ]
        // creator: [
        //   { required: true, message: "必填项", trigger: "blur" }
        // ]
      },
      serviceTypes: [
        {
          name: "普通服务",
          value: 1
        },
        {
          name: "网关服务",
          value: 2
        }
      ]
    };
  },
  computed: {
    dialogTitle() {
      return (this.type === "apply" ? "服务申请" : "修改服务") + this.name;
    }
  },
  methods: {
    submitForm(formName) {
      // let myFormData = this.formData;
      // alert("form submit: \n" + JSON.stringify(myFormData));
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData.httpName == '' && this.formData.dubboName == '') {
            this.$message({
              message: 'dubbo应用名称和http_domain必须填写一个！',
              type: 'warning'
            });
            return;
          }
          if (this.formData.httpName != ''&&this.formData.httpName.startsWith("http")) {
            this.$message({
              message: 'http_domain不能以http开头',
              type: 'warning'
            });
            return;
          }
          if (this.type != "apply") {
            _api.post("/center/service/updateApp", {
              serviceName: this.formData.name,
              serviceDomain: this.formData.httpName,
              dubboAppName: this.formData.dubboName,
              id: this.formData.id,
              serviceType: this.formData.serviceType
            }).then((res) => {
              if(res.ret==1){
                this.refreshList();
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '修改失败：' + res.error.msg,
                  type: 'error'
                });
              }
            }, (err) => {
              this.$message({
                message: '调用修改接口失败！',
                type: 'error'
              });
            });
          } else {
            _api.post("/center/service/apply", {
              serviceName: this.formData.name,
              serviceDomain: this.formData.httpName,
              dubboAppName: this.formData.dubboName,
              // TODO 这里后面要改，设置默认值
              creatorId: "",
              serviceType: this.formData.serviceType
            }).then((res) => {
              if (res.error.code == 200) {
                this.refreshList();
                const content = "<div style='color:red'>密钥只展示一次，注意保存</div><div>" + res.data + "</div>";
                this.$alert(content, "成功", {
                  dangerouslyUseHTMLString: true
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '服务申请失败！'
                });
              }

            }, (err) => {
              this.$message({
                message: '调用修改接口失败！',
                type: 'error'
              });
            });
          }
          this.visible = false;
          this.resetForm(formName);

        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    initForm() {
      console.log("#####记录:" + this.record)
      this.formData.creator = this.record["creatorId"];
      this.formData.dubboName = this.record["dubboApplicationName"];
      this.formData.httpName = this.record["httpDomain"];
      this.formData.creator = this.record["creatorId"];
      this.formData.id = this.record["id"];
      this.formData.name = this.record["serviceName"];
      // alert(JSON.stringify(this.formData));
      this.formData.serviceType = this.record["serviceType"];
    },
    onShow() {
      if (this.type != "apply") {
        this.initForm();
      }
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
