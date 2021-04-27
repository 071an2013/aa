<template>
  <div>
    <div class="rad-row">
      <el-form :inline="true" @query="requestList" :model="queryForm" class="demo-form-inline">
        <el-form-item label="服务名称">
          <el-input v-model="queryForm.serviceName" placeholder="选填全名" require="false"></el-input>
        </el-form-item>
        <el-form-item label="dubbo应用名称">
          <el-input v-model="queryForm.dubboAppName" placeholder="选填全名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="requestList">查询</el-button>
        </el-form-item>
      </el-form>
      <form-dialog v-bind:refreshList="requestList" name="" type="apply">
        <el-button type="success"  icon="el-icon-plus">服务申请</el-button>
      </form-dialog>
    </div>
    <div class="rad-row">
      <el-table
          :data="tableData"
          style="width: 100%; min-height: 300px">
        <el-table-column
            type="id"
            label="id"
            prop="id"
            width="80">
        </el-table-column>
        <el-table-column
            prop="serviceName"
            label="服务名称">
        </el-table-column>
        <el-table-column
                prop="onlineInstanceNum"
                label="在线实例数">
        </el-table-column>
        <el-table-column
            prop="dubboApplicationName"
            label="dubbo应用名称">
        </el-table-column>
        <el-table-column
            prop="httpDomain"
            label="http_domain"
            width="180">
        </el-table-column>
        <el-table-column
            prop="serviceType"
            label="服务类型"
            width="180">
            <template slot-scope="scope">
              {{scope.row.serviceType == 1 ? "普通服务" : "网关服务"}}
            </template> 
        </el-table-column>
        <el-table-column
                label="权限分配"
                width="180">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="showAuthList(scope.row['serviceName'])"
                    type="text"
                    size="small">
              已授权人
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="showInstance(scope.row['serviceName'])"
                type="text"
                size="small">
              查看　
            </el-button>
            <form-dialog
                name=""
                type="update"
                v-bind:refreshList="requestList"
                :record="scope.row"
                :recordIndex="scope.$index"
            >
              <el-button type="text" size="mini">修改</el-button>
            </form-dialog>
            <el-button
                @click.native.prevent="resetPwd(scope.row)"
                type="text"
                size="small">
              重置密钥
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
          :page-sizes="[10, 20, 50, 100]"
          :page-size="this.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total">
      </el-pagination>
    </div>
    <el-drawer
            size="50%"
            title="实例信息"
            :visible.sync="instanceDrawerFlag"
            direction="rtl">
      <ServiceInfo :service-name="serviceInfoName" :resource="currentInstance"/>
    </el-drawer>
    <el-drawer
            size="50%"
            title="授权人列表"
            :visible.sync="authDrawerFlag"
            direction="rtl">
      <AuthList :service-name="serviceInfoName" :resource="authList"/>
    </el-drawer>
  </div>

</template>


<script>
import ServiceInfo from './ServiceInfo';
import FormDialog from "./FormDialog";
import AuthList from "./AuthList";

export default {
  components: {AuthList, ServiceInfo, FormDialog},
  created() {
    this.requestList()
  },
  methods: {
    showInstance(name) {
      // 查询当前服务instance实例展现
      _api.get("/center/service/instanceList", {
        serviceName: name
      }).then((res) => {
        this.currentInstance = res.data;
        this.instanceDrawerFlag = true;
        this.serviceInfoName = name;
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询服务实例失败！'
        });
      });

    },
    showAuthList(serviceName) {
      // 查询当前服务instance实例展现
      _api.get("/center/service/auth/list", {
        serviceName: serviceName
      }).then((res) => {
        this.serviceInfoName = serviceName;
        this.authList = res.data;
        this.authDrawerFlag = true;
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询授权人列表失败！'
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.requestList();
    },
    // 重置密钥
    resetPwd(row) {
      this.$confirm('此操作将导致之前秘钥失效, 是否继续?', '重置密钥', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        _api.get("/center/service/resetPwd", {
          id: row.id
        }).then((res) => {
          if (res.error.code == 200) {
            const content = "<div style='color:#ff0000'>密钥只展示一次，注意保存</div><div>" + res.data + "</div>";
            this.$alert(content, "新密钥", {
              dangerouslyUseHTMLString: true
            });
          } else {
            this.$message({
              type: 'error',
              message: '重置密钥失败！'
            });
          }
        }, (err) => {
          this.$message({
            type: 'error',
            message: '重置密钥失败！'
          });
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        });
      });
    },
    // 查询所有服务
    requestList() {
      let params = {
        page: this.page,
        pageSize: this.pageSize
      };
      const {serviceName, dubboAppName = ''} = this.queryForm;
      // 服务名称
      if (serviceName.trim()) params['serviceName'] = serviceName.trim();
      // 单据状态
      if (dubboAppName.trim()) params['dubboAppName'] = (dubboAppName.trim());
      // console.log(params);
      this.loading = true;
      _api.get("/center/service/list", params).then((res) => {
        if (res.ret) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.error.msg);
        }
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询服务失败！'
        });
      });
    }
  },
  data() {
    return {
      currentInstance: [],
      authList:[],
      tableData: [],
      loading: true,
      listLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      queryForm: {
        serviceName: '',
        dubboAppName: ''
      },
      authDrawerFlag: false,
      instanceDrawerFlag: false,
      greyDrawerFlag: false,
      serviceInfoName:''
    }
  }
}
</script>