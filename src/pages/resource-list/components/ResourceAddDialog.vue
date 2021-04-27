<template>
    <!--对话框内容-->
    <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog('myForm')" class="form-dialog" :append-to-body="true">
      <el-form :model="formdata" label-width="120px" ref="myForm">
          <!-- id -->
          <el-form-item label="router id" prop="id">
              <el-input
                v-model="formdata.id"
                require="true"
                placeholder="同一个服务下router id不能重复"
                :disabled="type == 2 || type == 3" 
              ></el-input>
          </el-form-item>

          <!-- uri -->
          <el-form-item label="uri" prop="uri">
            <el-input
              v-model="formdata.uri"
              require="true"
              :disabled="type == 3" >
              <template slot="prepend">lb://</template>
            </el-input>
          </el-form-item>

          <!-- path predicate -->
          <el-form-item label="path" prop="path">
              <el-input
                v-model="formdata.path"
                require="true"
                placeholder="以/开始"
                :disabled="type == 3"
              ></el-input>
          </el-form-item>

          <!-- methop predicate -->
          <el-form-item label="method" prop="method">
              <el-input
                v-model="formdata.method"
                require="true"
                placeholder="http method"
                :disabled="type == 3"
              ></el-input>
          </el-form-item>

          <!-- strip prefix -->
          <el-form-item label="strip prefix" prop="stripPrefix">
            <el-input
              v-model="formdata.stripPrefix"
              require="true"
              placeholder="[0-N]"
              :disabled="type == 3"
            ></el-input>
          </el-form-item>

          <!-- order -->
          <el-form-item label="order" prop="order">
              <el-input
                v-model="formdata.order"
                require="true"
                :disabled="type == 3"
              ></el-input>
          </el-form-item>

          <el-form-item label="router配置预览">
            <el-input 
              type="textarea" 
              :rows="8" 
              :disabled="true" 
              v-model="routerPreview">
            </el-input>  
          </el-form-item>  


          <div style="margin-left:50px">
            <span>{{'资源名称:' + this.getResourceName()}}</span>
          </div>


        <el-form-item v-if="this.type == 1 || this.type == 2" style="margin-top:20px">
          <el-button type="primary" @click="submitForm('myForm')">{{this.type == 1 ? "新增" : "修改"}}</el-button>
          <el-button @click="resetForm('myForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>

export default {
  props: {
    resourceId: {
      type: Number,
      require: false
    },
    serviceName: {
      type: String,
      require: true
    },
    // 刷新父级数据
    refreshList: {
      type: Function,
      require: true
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    refreshDialogVisible: {
      type: Function,
      require: true
    },
    type: {
      type: Number,
      default: 1
    },
  },
  mounted() {

  },
  data() {
    return { 
      // 此处定义表单默认字段值。
      formdata: {
        id: "",
        uri: "",
        path: "",
        method: "",
        stripPrefix: 0,
        order: 0
      },
      visible: this.dialogVisible,
      routerPreview: "",
      httpMethods: ["GET","HEAD","POST","PUT","DELETE","OPTIONS","TRACE","PATCH"]
    };
  },
  watch: {
    dialogVisible:{
        handler: function (newValue, oldValue) {
          this.visible = newValue;
        },
        immediate: true
    },
    resourceId: {
      handler: function (newValue, oldValue){
        this.resourceId = newValue;
        // 获取资源详情
        if(this.resourceId != -1){
          console.log('获取资源详情:' + this.resourceId)
          _api.get("/center/resource", {
              serviceName: this.serviceName,
              id: this.resourceId
          }).then((res) => {
            if (res.ret == 1) {
              var routeDesc = JSON.parse(res.data.methodDesc);
              var uri = routeDesc.uri.split("//")[1];
              var path = routeDesc.predicates.filter(p => p.name == "Path")[0].args._genkey_0;

              var methodPrediacates = routeDesc.predicates.filter(p => p.name == "Method");
              var args = methodPrediacates[0].args;
              var methods = []
              for(var i = 0; i < Object.keys(args).length; i++){
                methods.push(args["_genkey_" + i]);  
              }
              var method = methods.join(",");

              var stripPrefix = routeDesc.filters.filter(f => f.name == "StripPrefix")[0].args._genkey_0;
              // 初始化表单的数据
              this.formdata = {
                id: routeDesc.id,
                uri: uri,
                path: path,
                method: method,
                stripPrefix: stripPrefix,
                order: routeDesc.order
              }  
            } else {
              this.$message({
                type: 'error',
                message: '查询路由详情失败:' + res.error.msg
              });
            }
          }, (err) => {
            this.$message({
              message: '查询路由详情失败',
              type: 'error'
            });
          });  
        }
      },
      immediate: true
    },
    serviceName: {
      handler: function (newValue, oldValue) {
          this.serviceName = newValue;
      },
      immediate: true  
    },
    formdata: {
      handler: function (val) {
        console.log("form:" + val)
        this.routerPreview = 
        "id: " + this.formdata.id + "\n" + 
        "uri: " + "lb://" + val.uri + "\n" + 
        "predicate:\n" +
        "- Path=" + val.path + "\n" + 
        "- Method=" + val.method + "\n" + 
        "filters:\n" + 
        "- StripPrefix=" + val.stripPrefix + "\n" +
        "order: " + val.order
      },
      deep: true //对象的深度验证
    },
  },
computed: {
    dialogTitle() {
      return this.type === 1 ? "新增gateway路由" : (this.type == 2 ? "修改gateway路由" : "gateway路由详情");
    }
  },
methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.formdata.id == ''){
            this.$message({
              message: 'router id不能为空',
              type: 'warning'
            });
            return;  
          }

          if (this.formdata.uri == '') {
            this.$message({
              message: 'uri不能为空',
              type: 'warning'
            });
            return;
          }

          if (this.formdata.path == '') {
            this.$message({
              message: 'path不能为空',
              type: 'warning'
            });
            return;
          }else {
            // 前端不对path做校验,后端校验path是否是ant style
            // const regex = /^\/(\w+\/?)+$/ig;
            // let matches = regex.exec(this.formdata.path)
            // if (!matches) {
            //   this.$message({
            //     message: 'path不合法',
            //     type: 'warning'
            //   });
            //   return;
            // }
          }

          if(this.formdata.method == ''){
            this.$message({
              message: 'mehod不能为空',
              type: 'warning'
            });
            return;  
          }else{
            console.log(this.formdata.method.toUpperCase())
            let methods = this.formdata.method.split(",")
            methods.forEach(m => {
              let find = this.httpMethods.find(it => it == m.toUpperCase());
              console.log(find)
              if(!find){
                this.$message({
                  message: 'mehod不合法',
                  type: 'warning'
                });
                return;  
              }
            });
            
          }

          if(this.formdata.stripPrefix < 0){
              this.$message({
                message: 'strip prefix必须大于等于0',
                type: 'warning'
              });
              return;    
          }

          let predicates = [];
          let pathPredicate = {
              name: "Path",
              args: {
                _genkey_0: this.formdata.path
              }   
          };
          predicates.push(pathPredicate)
          let methods = this.formdata.method.split(",")
          let methodPredicate = {}
          methodPredicate["name"] = "Method"
          let args = {}
          for(var i = 0; i < methods.length; i++){
            args["_genkey_" + i] = methods[i];
          }
          methodPredicate["args"] = args
            predicates.push(methodPredicate) 

          console.log("predicates:" + JSON.stringify(predicates))
          console.log("开始提交表单")
          let resourceName = this.getResourceName()
          if(this.type == 1){
            // 新增资源
            _api.post("/center/resource/add", {
              serviceName: this.serviceName,
              resource: resourceName,
              routeDescription: {
                id: this.formdata.id,
                predicates: predicates,
                filters: [
                  {
                    name: "StripPrefix",
                    args: {
                      _genkey_0: this.formdata.stripPrefix
                    }
                  }
                ],
                uri: "lb://" + this.formdata.uri,
                order: this.formdata.order  
              },
              protocol: "GATEWAY" 
            }).then((res) => {
              if (res.ret == 1) {
                this.refreshList(this.resourceId);
                this.$message({
                  message: '新增资源成功!',
                  type: 'success'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '新增资源失败:' + res.error.msg
                });
              }

            }, (err) => {
              this.$message({
                message: '调用新增资源接口失败!',
                type: 'error'
              });
            });
          }
          this.visible = false;
          this.resetForm(formName);
        }  
      });
    },

    resetForm(formName) {
      let id = this.formdata.id 
      this.$refs[formName].resetFields();
      this.formdata = {} 
      if(this.type == 2){
          this.formdata.id = id;
      }
    },

    closeDialog(formName){
      console.log("关闭资源的弹窗")
      this.resetForm(formName);
      this.refreshDialogVisible(false);
    },

    getResourceName(){
      return this.serviceName + "#" + this.formdata.id;
    },
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
