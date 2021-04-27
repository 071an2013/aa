<template>
  <div>
    <div style="margin-left:20px">
      <span>{{
        '资源名称：' + this.resourceName
      }}</span>
    </div><br/>

    <div>
      <el-button type="warning" size="small" @click="showAddStrategyDialog()" style="margin-left: 4px">新增策略</el-button>
      <el-button type="warning" size="small" @click="getStrategyByResourceId(resourceId)" style="margin-left: 4px">刷新</el-button>
    </div>

    <el-table
        :data="strategyList"
        cell-class-name="m-ellipsis"
        style="width: 100%; min-height: 300px; max-height: 400px; overflow-y: auto">
        <el-table-column
            prop="id"
            label="id"
            width="80">
        </el-table-column>
        <el-table-column
            prop="strategyName"
            label="策略类型"
            width="120">
        </el-table-column>
        <el-table-column prop="switchFlag" label="策略开关" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switchFlag"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value=true
              :inactive-value=false 
              @change="handleSwitch(scope.$index, strategyList, $event)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="el"
            label="el"
            width="120">
        </el-table-column>
        <el-table-column
            prop="paramType"
            label="参数类型"
            width="120">
        </el-table-column>
        <!-- 策略内容 -->  
        <el-table-column
            prop="strategyContent"
            label="策略内容"
            width="120">
            <template slot-scope="scope">{{ JSON.stringify(scope.row.strategyContent) }}</template>
        </el-table-column> 

        <el-table-column
            prop="tOrder"
            label="优先级"
            width="120">
        </el-table-column>

        <el-table-column
            prop="cT"
            label="创建时间"
            width="120">
            <template slot-scope="scope">{{ formatDate(new Date(scope.row.cT), "yyyy-MM-dd") }}</template>
        </el-table-column>

        <el-table-column
            prop="uT"
            label="更新时间"
            width="120">
            <template slot-scope="scope">{{ formatDate(new Date(scope.row.uT), "yyyy-MM-dd") }}</template>
        </el-table-column>
        

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showUpdateStrategyDialog(scope.$index, strategyList)"
              type="text"
              size="small"
            >
              修改
            </el-button>
            <el-button
              @click.native.prevent="delStrategy(scope.$index, strategyList)"
              type="text"
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>

    <StrategyDialog :resourceId="resourceId"
                    :recordId="strategyRecordId" 
                    :serviceName="serviceName"
                    :refreshList="getStrategyByResourceId" 
                    :type="dialogType"
                    :dialogVisible="dialogVisible"
                    :refreshDialogVisible="showStrategyDialog" />

    
  </div>
</template>
<style>
.m-ellipsis {
  　　width: 120;
  　　overflow: hidden;
  　　display: -webkit-box;
  　　-webkit-box-orient: vertical;
  　　-webkit-line-clamp: 2;
}
</style>
<script>

import StrategyDialog from './StrategyDialog'

export default {
  components: { StrategyDialog },
  props: {
    resourceId: {
      type: Number,
      require: true
    },
    serviceName: "",
    resourceName: ""
  },
  methods: {
    getStrategyByResourceId(resourceId) {
      console.log("invoke api for get strategy")
      console.log("服务名称:" + this.serviceName)
      // 查询当前资源的策略列表
      _api.get("/center/resource/strategy", {
        resourceId: resourceId,
        serviceName: this.serviceName
      }).then((res) => {
        console.log("res:" + res)
        this.strategyList = res.data;      
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询资源策略列表失败!'
        });
      });
    },

    showAddStrategyDialog(name){
      this.dialogVisible = true
      this.dialogTitle = "新增策略"
      this.dialogType = 1
    },

    showUpdateStrategyDialog(idx, rows){
      this.dialogVisible = true
      this.dialogTitle = "更新策略"
      this.dialogType = 2
      this.strategyRecordId = rows[idx].id
    },

    showStrategyDialog(visible) {
      this.dialogVisible = visible;
      this.strategyRecordId = -1;
    },

    handleSwitch(idx, rows, val) {
      console.log("switch:" + val)
      var requestBody = {
        id: rows[idx].id,
        on: val,
        serviceName: this.serviceName
      }
      _api.post('/center/resource/strategy/switch', requestBody).then(
        res => {
          if (res.error.code != 200) {
            this.$message({
              message: res.error.msg,
              type: 'warning'
            })
            rows[idx].switchFlag = val == 1 ? 0 : 1
            return
          }
        },
        err => {
          this.$message({
            message: res.error.msg,
            type: 'error'
          })
          rows[idx].switchFlag = val == 1 ? 0 : 1
          return
        }
      )
    },

    delStrategy(idx, rows){
      let _this = this;
      _api.post("/center/resource/strategy/del?id=" + rows[idx].id + "&serviceName=" + this.serviceName)
      .then(
        (res) => {
          _this.getStrategyByResourceId(this.resourceId);
        },
        (err) => {
          this.$message({
            type: 'error',
            message: '删除策略失败！'
          });
        }
      );
    },

    formatDate(timestamp, type) {
      if (!timestamp) {
        return '--'
      }
      var myDate = new Date(timestamp * 1000);
      var y = myDate.getFullYear();//年
      var m = (myDate.getMonth() + 1).toString().padStart(2, '0');//月
      var d = myDate.getDate().toString().padStart(2, '0');//日
      var hh = myDate.getHours().toString().padStart(2, '0');
      var mm = myDate.getMinutes().toString().padStart(2, '0');
      var ss = myDate.getSeconds().toString().padStart(2, '0');
      if (type == "yyyy-MM") {//yyyy-mm
        return [y, m].join('-');
      } else if (type == "yyyy-MM-dd") {//yyyy-mm-dd
        return [y, m, d].join('-');
      } else if (type == "yyyy-MM-dd hh:mm:ss") {//2020-02-02 00:00:00
        return [y, m, d].join('-') + ' ' + [hh, mm, ss].join(':');
      } else {
        return "";
      }
    }
  },

  watch: {
    resourceId: {
      handler: function (newValue, oldValue) {
        this.strategyList = this.getStrategyByResourceId(newValue);
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

  data() {
    return {
      strategyList: [],
      dialogTitle: "",
      dialogVisible: false,
      dialogType: 0, // 1是新增, 2是修改
      strategyRecordId: -1
    }
  }
}
</script>