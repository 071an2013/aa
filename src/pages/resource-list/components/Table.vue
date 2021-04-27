<template>
  <div>
    <div class="rad-row">
      <el-form :inline="true" :model="queryForm"  class="demo-form-inline">
        <el-form-item label="服务名称">
          <el-select
            v-model="queryForm.serviceName"
            filterable
            placeholder="请选择"
            require="true"
            @change="requestList"
          >
            <el-option
              v-for="item in serviceItems"
              :key="item.id"
              :label="item.serviceName"
              :value="item.serviceName"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资源名称">
          <el-input v-model="queryForm.resource" placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="requestList">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button v-if="selectedServiceType == 2" type="primary" @click="showAddResourceDialog(true)">新增路由</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="rad-row" :gutter="10">
      <el-table :data="tableData" style="width: 100%; min-height: 300px;">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="resource" label="资源">
          <template slot-scope="scope">
            {{scope.row.resource}}
            <el-tag v-if="scope.row.gatewayLocalRoute" type="danger">本地配置</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="onlineInstanceNum" label="在线实例数" width="100">
        </el-table-column>
        <el-table-column prop="protocol" label="资源协议" width="100">
        </el-table-column>

        <el-table-column label="策略" width="200">
          <template v-slot="{ row: { strategies } }">
            <template v-if="strategies.length">
            <span v-for="(tag, index) in strategies" :key="tag" >
              <el-tag type="primary" disable-transitions >{{ tag.strategyName }}</el-tag>
              <span v-if="strategies.length - 1 !== index" >-></span>
            </span>
            </template>
            <template v-else>暂无</template>
          </template>
        </el-table-column>

          <!-- <template slot-scope="{ row: { strategies } }">
            <span v-for="(tag, index) in strategies" :key="tag" >
              <el-tag type="primary" disable-transitions >{{ tag.strategyName }}</el-tag>
              <span v-if="strategies.length - 1 !== index" >-></span>
            </span>
          </template> -->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="showStrategy(scope.$index, tableData)"
              type="text"
              size="small"
            >
                策略配置
            </el-button>
            <el-button
              @click.native.prevent="showInstance(scope.$index, tableData)"
              type="text"
              size="small"
            >
              查看实例
            </el-button>
            <el-button
              v-if="scope.row.protocol == 'GATEWAY'"
              @click.native.prevent="showDetailResourceDialog(scope.$index, tableData)"
              type="text"
              size="small"
            >
              路由详情
            </el-button>
            <el-button
              v-if="scope.row.protocol == 'GATEWAY' && !scope.row.gatewayLocalRoute"
              @click.native.prevent="deleteResource(scope.$index, tableData)"
              type="text"
              size="small"
            >
              删除路由
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="rad-row">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.page"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>

    <el-drawer
      size="50%"
      title="实例信息"
      :visible.sync="instanceDrawerFlag"
      direction="rtl"
    >
      <ResourceInstance v-bind:resource="this.currentResource" />
    </el-drawer>

    <el-drawer
      title="策略配置"
      :visible.sync="strategyDrawerFlag"
      direction="rtl"
      size="50%"
    >
      <ServiceResourceStrategy 
          :resourceId="this.selectedResourceId"
          :resourceName="this.selectedResourceName" 
          :serviceName="this.selectedServiceName"/>
    </el-drawer>

    <!-- 资源新增弹窗 -->
    <ResourceAddDialog
          :resourceId="selectedResourceId" 
          :serviceName="queryForm.serviceName"
          :refreshList="requestList" 
          :dialogVisible="addResourceDialogVisible"
          :refreshDialogVisible="refreshResourceDialog"
          :type="resourceDialogType" />

  </div>
</template>


<script>
import ResourceInstance from './ResourceInstance'
import GreyStrategy from './GreyStrategy'
import { queryServiceDropList } from './service'
import { queryResources } from './service'
import ServiceResourceStrategy from './ServiceResourceStrategy'
import ResourceAddDialog from './ResourceAddDialog'

export default {
  components: { ResourceInstance, GreyStrategy, ServiceResourceStrategy, ResourceAddDialog},
  methods: {
    showStrategy(index, rows) {
      console.log("resourceId:" + rows[index].id);
      this.strategyDrawerFlag = true
      this.selectedResourceId = rows[index].id
      this.selectedServiceName = rows[index].serviceName
      this.selectedResourceName = rows[index].resource
    },
    showInstance(index, rows) {
      this.currentResource = rows[index]
      this.instanceDrawerFlag = true
    },
    handleSizeChange(val) {
      this.pageCount = val
      this.requestList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.requestList()
    },
    handleSwitch(idx, rows, value) {
      var requestBody = rows[idx]
      requestBody.resourceId = requestBody.id
      _api.post('/center/resource/setting', requestBody).then(
        res => {
          if (res.error.code != 200) {
            this.$message({
              message: res.error.msg,
              type: 'warning'
            })
            rows[idx].openGrey = value == 1 ? 0 : 1
            return
          }
        },
        err => {
          this.$message({
            message: res.error.msg,
            type: 'error'
          })
          return
        }
      )
    },
    requestList() {
      this.selectedServiceType = this.serviceItems.filter(s => s.serviceName == this.queryForm.serviceName)[0].serviceType;
      let params = {
        page: this.page,
        pageSize: this.pageCount
      }

      // 服务名称
      if (this.queryForm.serviceName) {
        params.serviceName = this.queryForm.serviceName
      } else {
        return
      }
      // 单据状态
      if (this.queryForm.resource) {
        params.resource = this.queryForm.resource
      }

      this.loading = true
      // _api.get('/center/resource/pager', params).then(
      //   res => {
      //     this.tableData = res.data.list
      //     this.total = res.data.total
      //   },
      //   err => {
      //     console.warn(err)
      //   }
      // )
      queryResources(params).then(
        res => {
          this.tableData = res.data.list
          this.total = res.data.total
        },
        err => {
          console.warn(err)
        }
      )
    },
    
    // 展示新增资源的弹窗
    showAddResourceDialog(visible) {
      this.addResourceDialogVisible = visible;
      this.resourceDialogType = 1;
    },

    // 展示资源详情的弹窗
    showDetailResourceDialog(index, rows) {
      this.addResourceDialogVisible = true;
      this.resourceDialogType = 3;
      this.selectedResourceId = rows[index].id;
    },

    refreshResourceDialog(visible) {
      this.addResourceDialogVisible = visible;
      this.selectedResourceId = -1;
    },

    // 删除资源
    deleteResource(index, rows){
      this.$confirm('删除操作不可恢复, 是否继续?', '删除路由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log("delete resource id:" + rows[index].id)
        var requestBody = {
          id: rows[index].id,
          serviceName: rows[index].serviceName
        }
        _api.post('/center/resource/delete', requestBody).then(
          res => {
            if (res.ret == 1) {
                this.requestList();
                this.$message({
                  message: '删除资源成功!',
                  type: 'success'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '删除资源失败:' + res.error.msg
                });
              }  
          },
          err => {
            this.$message({
              message: "删除资源失败,msg:" + res.error.msg,
              type: 'error'
            })
            return
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },

  data() {
    return {
      selectedService: '',
      serviceItems: [],
      currentResource: null,
      tableData: [],
      loading: false,
      listLoading: false,
      total: 0,
      page: 1,
      pageCount: 20,
      pageSize: 10,
      queryForm: {
        serviceName: '',
        resource: ''
      },
      instanceDrawerFlag: false,
      strategyDrawerFlag: false,
      selectedResourceId: -1,
      selectedServiceName: "",
      selectedResourceName: "",
      addResourceDialogVisible: false,
      resourceDialogType: 1, // 1=新增 2=修改 3=详情
      selectedServiceType: 1
    }
  },
  mounted() {
    this.serviceItems = queryServiceDropList()
    queryServiceDropList()
      .then(
        res => {
          this.serviceItems = res.data
          this.queryForm.serviceName = this.serviceItems[0].serviceName
        },
        err => {
          console.warn(res)
        }
      )
      .then(rs => {
        var params = {
          page: this.page,
          pageSize: this.pageCount,
          serviceName: this.serviceItems[0].serviceName
        }
        queryResources(params).then(
          res => {
            this.tableData = res.data.list
            this.total = res.data.total
          },
          err => {
            console.warn(err)
          }
        )
      })
    this.$nextTick(function () {
      this.requestList()
    })
  }
}
</script>