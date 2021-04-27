<template>
  <div>
    <div>
      <span>{{ '实例IP：' + (this.curr == null ? '' : this.curr.ip) }}</span><br/>
      <span>{{ '实例URL：' + (this.curr == null ? '' : this.curr.url) }}</span>
    </div><br/>
    <div>
      <el-button type="warning" size="small" @click="queryInstanceSwitches" style="margin-left: 4px">刷新</el-button>
    </div>
    <el-table
      :data="instanceSwitchList"
      cell-class-name="m-ellipsis"
      style="width: 100%; min-height: 300px; max-height: 400px; overflow-y: auto"
    >
      <el-table-column prop="strategyId" label="策略ID" width="80"> </el-table-column>
      <el-table-column prop="strategyName" label="策略类型" width="90"> </el-table-column>
      <el-table-column prop="strategyContent" label="策略内容" width="150"> </el-table-column>
      <el-table-column prop="switchFlag" label="开关状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.switchFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitch(scope.$index, instanceSwitchList, $event)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
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
import { queryInstanceSwitches } from './service'

export default {
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 8) {
        return value.slice(0, 8) + '...'
      }
      return value
    }
  },
  methods: {
    handleSwitch(idx, rows, val) {
      var requestBody = {
        strategyId: rows[idx].strategyId,
        serviceName: this.curr.serviceName,
        resourceId: this.curr.resourceId,
        instanceId: this.curr.instanceId,
        switchFlag: val
      }
      _api.post('/center/resource/instance/switch/shift', requestBody).then(
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
    queryInstanceSwitches() {
      queryInstanceSwitches({
        serviceName: this.curr.serviceName,
        instanceId: this.curr.instanceId,
        resourceId: this.curr.resourceId
      }).then(
        res => {
          this.instanceSwitchList = res.data
        },
        err => {
          console.warn(err)
        }
      )
    }
  },
  watch: {
    instance: {
      handler: function (newVal, oldVal) {
        this.curr = newVal
        this.queryInstanceSwitches()
      },
      immediate: true
    }
  },
  props: {
    instance: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      curr: null,
      instanceSwitchList: null,
      classObject: {
        info: true
      }
    }
  }
}
</script>