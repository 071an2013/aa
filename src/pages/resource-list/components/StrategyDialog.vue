<template>
    <!--对话框内容-->
    <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog('myForm')" class="form-dialog" :append-to-body="true" >
      <el-form :model="formdata" label-width="120px" ref="myForm">
        <el-form-item label="id" prop="id" hidden="hidden">
          <el-input v-model="formdata.id"></el-input>
        </el-form-item>
          <!-- 策略类型 -->

          
          
          <el-form-item label="策略类型" style="position: relative;">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        1、<span style="font-weight:bold;">灰度:</span> 当我们的几台服务器提供的服务处于不同的版本的时候，我们可以通过请求参数/客户端ip对请求实现控制，可以达到“特定的请求打到特定的机器”这一目的<br>
                        2、<span style="font-weight:bold;">黑名单:</span> 过滤掉一些请求<br>
                        3、<span style="font-weight:bold;">白名单:</span> 只允许特定的请求访问我们的资源
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-select
              v-model="formdata.strategyType"
              placeholder="请选择策略"
              :disabled="type!=1"
              @change="initStrategyDefaultOptions()"
            >
              <el-option
                v-for="item in strategyTypeOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <!-- 参数类型 -->
          <el-form-item label="参数类型" prop="paramType" v-if="formdata.strategyType == 2 || formdata.strategyType == 4 || formdata.strategyType == 5">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        提供el表达式解析的数据上下文，目前有4类:<br/>
                        1、<span style="font-weight:bold;">PARAM:</span> 从get、post、dubbo的请求参数中获取我们需要配置的值<br>
                        2、<span style="font-weight:bold;">HEADER:</span> 从http header中获取我们需要配置的值<br>
                        3、<span style="font-weight:bold;">REMOTE_IP:</span> 根据请求发起方的ip地址进行匹配<br>
                        4、<span style="font-weight:bold;">ATTACHMENT:</span> 对于dubbo请，ATTACHMENT类型表示从隐式参数中进行提取<br>
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-select
              v-model="formdata.paramType"
              placeholder="请选择参数类型"
            >
              <el-option
                v-for="item in paramTypeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <!-- el -->
          <el-form-item label="el" prop="el" v-if="formdata.paramType != 'REMOTE_IP'">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        表示从访问资源的请求报文中提取指定参数的表达式，该参数值用于在特定的灰度策略（Hash、指定值）中进行判灰处理<br/>
                        例子参见文档: <a href="https://meicai.feishu.cn/docs/doccnIboIhC9JV4sJLR76SuMVMc#fmR93q">帮助文档</a>
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-input
              v-model="formdata.el"
              require="true"
            ></el-input>
          </el-form-item>

          <!-- 策略内容 -->
          <!-- 灰度策略展示 -->
          <el-form-item v-if="formdata.strategyType == 2" label="灰度策略">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        1、<span style="font-weight:bold;">指定值:</span> 指定值的设置 通过英文逗号分割 ，当el表达式提取的参数值与 指定值 中的某个值相同时，即判定灰度命中<br>
                        2、<span style="font-weight:bold;">随机策略:</span> 随机策略的处理逻辑是在 0～1000中取一个随机值，如果该随机值小于等于配置的 灰度量，即判定灰度命中<br>
                        3、<span style="font-weight:bold;">Hash策略:</span> hash策略的处理逻辑是对el表达式提取的参数值做一次hash并取模落在0～1000之间，若该hash值小于等于配置的 灰度量，即判定灰度命中
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-select
              v-model="formdata.strategyContent.strategy"
              placeholder="请选择灰度策略"
            >
              <el-option
                v-for="item in greyStrategyDropList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-if="(formdata.strategyType == 2) && (formdata.strategyContent.strategy == 2 || formdata.strategyContent.strategy == 3)" label="灰度量[0-1000]">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        1、随机策略的处理逻辑是在 0～1000中取一个随机值，如果该随机值小于等于配置的 灰度量，即判定灰度命中<br/>
                        2、hash策略的处理逻辑是对el表达式提取的参数值做一次hash并取模落在0～1000之间，若该hash值小于等于配置的 灰度量，即判定灰度命中<br/>
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-input
              v-model="formdata.strategyContent.rate"
              require="true"
            ></el-input>
          </el-form-item>

          <el-form-item v-if="((formdata.strategyType == 2) && formdata.strategyContent.strategy == 1) || (formdata.strategyType == 4) || (formdata.strategyType == 5)" label="指定值">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        指定值的设置 通过英文逗号分割 ，当el表达式提取的参数值与 指定值 中的某个值相同时，即判定灰度命中
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-input
              v-model="formdata.strategyContent.values"
              require="true"
            ></el-input>
          </el-form-item>

          <!-- 优先级(0-99) -->
          <el-form-item label="优先级" prop="tOrder">
            <el-tooltip placement="top">
              <div slot="content" class="tips-content text-tips-content">
                  <div class="rule-box">
                        是代表当前策略执行，同一资源下的多个策略，优先级的值越小，执行顺序越靠前
                  </div>
              </div>
              <i class="el-icon-question" style="position: absolute;z-index: 8;left: -84px;top: 11px;" />
            </el-tooltip>
            <el-input
              v-model="formdata.tOrder"
              require="true"
            ></el-input>
          </el-form-item>

          <!-- 开关 -->
          <el-form-item label="是否开启" prop="switchFlag">
            <el-switch
              v-model="formdata.switchFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value=true
              :inactive-value=false
            ></el-switch>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('myForm')">{{ type != 1 ? '修改' : '新增' }}</el-button>
          <el-button @click="resetForm('myForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
import { greyStrategies } from './service'
export default {
  props: {
    resourceId:{
      type: Number,
      require: true
    },
    recordId: {
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
    type: {
      type: Number,
      default: 1
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    refreshDialogVisible: {
      type: Function,
      require: true
    }
  },
  mounted() {
    // 灰度策略
    this.greyStrategyDropList = greyStrategies();
  },
  data() {
    return { 
    // 此处定义表单默认字段值。
      formdata: {
        id : "",
        resourceId: this.resourceId,
        strategyType: "",
        el: "",
        paramType: "PARAM",
        strategyContent: {},
        tOrder: 1,
        switchFlag: false
      },
      strategyTypeOptions: [
        {
          "name": "灰度",
          "value": 2  
        },
        {
          "name": "黑名单",
          "value": 4  
        },
        {
          "name": "白名单",
          "value": 5  
        }
      ],
      paramTypeOptions: [
        "PARAM",
        "HEADER",
        "ATTACHMENT",
        "REMOTE_IP"
      ],
      greyStrategyDropList: [],
      curRecord: {},
      visible: this.dialogVisible
    };
  },
computed: {
    dialogTitle() {
      return this.type === 1 ? "新增策略" : "修改策略";
    }
  },
watch: {
  resourceId: {
      handler: function (newValue, oldValue) {
        this.resourceId = newValue;  
      },
      immediate: true
  },
  dialogVisible:{
      handler: function (newValue, oldValue) {
        this.visible = newValue;
      },
      immediate: true
  },
  recordId:{
    handler: function (newValue, oldValue) {
        this.recordId = newValue;
        if(this.type == 1){
          this.formdata.id = ""
          this.formdata.resourceId = this.resourceId
          this.formdata.strategyType = 2
          this.formdata.el = "",
          this.formdata.paramType = "PARAM",
          this.formdata.strategyContent = {},
          this.formdata.tOrder = 1,
          this.formdata.switchFlag = false
        }else{
          this.initForm();
        } 
      },
      immediate: true
  },
  serviceName: {
    handler: function (newValue, oldValue) {
        this.serviceName = newValue;
    },
    immediate: true  
  }
},
methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formdata.el == '' && this.formdata.paramType != "REMOTE_IP") {
            this.$message({
              message: 'el表达式不能为空',
              type: 'warning'
            });
            return;
          }
          if (this.formdata.tOrder < 1 || this.formdata.tOrder > 99) {
            this.$message({
              message: '优先值取值在[1-99]之间',
              type: 'warning'
            });
            return;
          }

          if(this.formdata.strategyType == 2){
              if(this.formdata.strategyContent.rate < 0 || this.formdata.strategyContent.rate > 1000){
                  this.$message({
                    message: '灰度量取值在[0-1000]之间',
                    type: 'warning'
                  });
                  return;  
              }
              if(this.formdata.strategyContent.strategy == 1){
                if(this.formdata.strategyContent.values == ''){
                  this.$message({
                    message: '指定值不能为空',
                    type: 'warning'
                  });
                  return;
                }
                this.formdata.strategyContent.values = this.formdata.strategyContent.values.split(',')    
              }
              this.formdata.strategyContent.el = this.formdata.el;
          }
          console.log("提交表单:" + this.serviceName)
          if (this.type != 1) {
            _api.post("/center/resource/strategy/update", {
              id: this.formdata.id,
              resourceId: this.resourceId,
              strategyType: this.formdata.strategyType,
              el: this.formdata.el,
              paramType: this.formdata.paramType,
              strategyContent: JSON.stringify(this.formdata.strategyContent),
              tOrder: this.formdata.tOrder,
              switchFlag: this.formdata.switchFlag,
              serviceName: this.serviceName
            }).then((res) => {
              if(res.ret==1){
                this.refreshList(this.resourceId);
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '修改失败:' + res.error.msg,
                  type: 'error'
                });
              }
            }, (err) => {
              this.$message({
                message: '修改策略失败:' + res.error.msg,
                type: 'error'
              });
            });
          } else {
            _api.post("/center/resource/strategy/add", {
              resourceId: this.resourceId,
              strategyType: this.formdata.strategyType,
              el: this.formdata.el,
              paramType: this.formdata.paramType,
              strategyContent: JSON.stringify(this.formdata.strategyContent),
              tOrder: this.formdata.tOrder,
              switchFlag: this.formdata.switchFlag,
              serviceName: this.serviceName 
            }).then((res) => {
              if (res.error.code == 200) {
                this.refreshList(this.resourceId);
                this.$message({
                  message: '新增策略成功!',
                  type: 'success'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '新增策略失败:' + res.error.msg
                });
              }

            }, (err) => {
              this.$message({
                message: '调用修改接口失败!',
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
      this.formdata.strategyContent = {}
    },

    initForm() {
      if(this.recordId != -1){
        this.getStrategyById(this.recordId)
      }
    },

    getStrategyById(id){
      console.log("invoke api for get strategy detail")
      _api.get("/center/resource/strategy/byId", {
        id: id,
        serviceName: this.serviceName
      }).then((res) => {
        if(res.data != undefined){
          this.curRecord = res.data;
          this.formdata.id = this.curRecord["id"];
          this.formdata.resourceId = this.curRecord["resourceId"];
          this.formdata.strategyType = this.curRecord["strategyType"];
          this.formdata.strategyName = this.curRecord["strategyName"];
          this.formdata.el = this.curRecord["el"];
          this.formdata.paramType = this.curRecord["paramType"];
          console.log("策略内容:" + JSON.stringify(this.curRecord["strategyContent"]))
          // this.formdata.strategyContent = this.curRecord["strategyContent"];
          this.formdata.strategyContent = JSON.parse(this.curRecord["strategyContent"]);
          if(this.formdata.strategyType == 2) { // 若当前策略是灰度

          // this.formdata.strategyContent = JSON.parse(this.curRecord["strategyContent"]);
          // if(this.formdata.strategyType == 2 || this.formdata.strategyType == 3 ||
          //   this.formdata.strategyType == 4 || this.formdata.strategyType == 5){ // 若当前策略是灰度

            let s = this.formdata.strategyContent.strategy;
            switch (s) {
              case "DEFAULT":
                this.formdata.strategyContent.strategy = 1;
                break;
              case "RANDOM":
                this.formdata.strategyContent.strategy = 2;
                break;
              case "HASH":
                this.formdata.strategyContent.strategy = 3;
                break;
              default:
                break;
            }
            console.log("strategyContent.values:" + this.formdata.strategyContent.values)
            this.formdata.strategyContent.values = this.formdata.strategyContent.values;  
          }
          this.formdata.tOrder = this.curRecord["tOrder"];
          this.formdata.switchFlag = this.curRecord["switchFlag"];
        }
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询策略失败!'
        });
      });
    },

    initStrategyDefaultOptions(){
      if(this.formdata.strategyType == 2){
        console.log("初始化灰度策略初始设置")
        this.formdata.strategyContent = {
          rate: "",
          strategy: "",
          el: "",
          values: ""
        }  
      }
    },

    closeDialog(formName){
      console.log("关闭策略变更窗口")
      this.resetForm(formName);
      this.refreshDialogVisible(false);
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
