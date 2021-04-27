<template>
  <div>
    <div>
      <span>{{
        '资源名称：' + (this.curr == null ? '' : this.curr.resource)
      }}</span>
    </div><br/>
    <div>
      <el-button type="warning" size="small" @click="queryInstances" style="margin-left: 4px">刷新</el-button>
    </div>
    <el-table
      :data="instanceList"
      cell-class-name="m-ellipsis"
      style="width: 100%; min-height: 300px; max-height: 400px; overflow-y: auto"
    >
      <el-table-column prop="instanceId" label="实例ID" width="120">
        <template slot-scope="scope">
          {{scope.row.instanceId}}
          <el-tag v-if="scope.row.diff == 1" type="danger">上线，无cache</el-tag>
          <el-tag v-if="scope.row.diff ==2" type="warning">下线，有Cache</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="实例IP" width="140"> </el-table-column>
      <el-table-column
        show-overflow-tooltip
        filter-placement="top-start"
        prop="url"
        label="URL"
      >
      </el-table-column>
      <el-table-column prop="protocol" label="协议" width="80">
      </el-table-column>
      <!-- <el-table-column prop="openGrey" label="灰度开关" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.openGrey"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitch(scope.$index, instanceList, $event)"
          ></el-switch>
        </template>
      </el-table-column> -->

      <el-table-column prop="status" label="状态" width="80" sortable>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">上线</el-tag>
          <el-tag v-if="scope.row.status != 1" type="info">下线</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="详情" width="80">
        <template slot-scope="scope">
            <el-button
              @click.native.prevent="showInstanceSwitch(scope.$index, instanceList)"
              type="text"
              size="small"
            >
               实例开关
            </el-button>
         </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="开关信息"
      :append-to-body="true"
      :visible.sync="instanceStrategySwitchDrawerFlag"
    >
      <InstanceStrategySwitch v-bind:instance="this.currentInstance"  />
    </el-drawer>

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
import InstanceStrategySwitch from './InstanceStrategySwitch'
import { queryInstances } from './service'

export default {
  components: { InstanceStrategySwitch },
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
        serviceName: this.curr.serviceName,
        instanceResourceId: rows[idx].id,
        openGrey: val
      }

      _api.post('/center/resource/instance/grep/flag', requestBody).then(
        res => {
          if (res.error.code != 200) {
            this.$message({
              message: res.error.msg,
              type: 'warning'
            })

            rows[idx].openGrey = val == 1 ? 0 : 1
            return
          }
        },
        err => {
          this.$message({
            message: res.error.msg,
            type: 'error'
          })

          rows[idx].openGrey = val == 1 ? 0 : 1
          return
        }
      )
    },
    showInstanceSwitch(index, rows) {
          this.currentInstance = rows[index]
          this.currentInstance.serviceName = this.curr.serviceName
          this.instanceStrategySwitchDrawerFlag = true
    },
    queryInstances() {
      queryInstances({
        serviceName: this.curr.serviceName,
        resourceId: this.curr.id
      }).then(
        res => {
          this.instanceList = res.data
        },
        err => {
          console.warn(err)
        }
      )
    }
  },
  watch: {
    resource: {
      handler: function (newVal, oldVal) {
        this.curr = newVal
        this.queryInstances()
      },
      immediate: true
    }
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      curr: null,
      currentInstance:null,
      instanceList: null,
      instanceStrategySwitchDrawerFlag:false,
      classObject: {
        info: true
      }
    }
  }
}
</script>