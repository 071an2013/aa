<template>
  <div>
    <div>
      <el-button type="warning" size="small" @click="newAuth(serviceName)" style="margin-left: 4px">新增权限</el-button>
      <el-button type="warning" size="small" @click="showList(serviceName)" style="margin-left: 4px">刷新</el-button>
    </div>
    <el-table
        v-if="showForm"
        :data="showInfoList"
        cell-class-name="m-ellipsis"
        style="width: 100%; min-height: 300px; max-height: 400px; overflow-y: auto">
      <el-table-column
          prop="id"
          label="id"
          width="80">
      </el-table-column>
      <el-table-column
              prop="serviceName"
              label="服务名"
              width="120">
      </el-table-column>
      <el-table-column
          prop="userEmail"
          label="授权人邮箱"
          width="150">
        <template slot-scope="scope">
          {{scope.row.userEmail}}
        </template>
      </el-table-column>
      <el-table-column
              prop="cT"
              label="授权时间">
        <template slot-scope="scope">{{ formatDate(new Date(scope.row.cT), "yyyy-MM-dd") }}</template>
      </el-table-column>
      <el-table-column
              label="操作">
        <template slot-scope="scope">
          <el-button
                  @click.native.prevent="deleteAuth(scope.row)"
                  type="text"
                  size="small">
            删除权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="新增授权" :visible.sync="visible" class="form-dialog" :append-to-body="true">
        <el-form :model="formData" label-width="120px" ref="myForm">
          <el-form-item label="授权人邮箱，多个,号隔开" prop="emails">
            <el-input type="textarea" v-model="formData.emails"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('myForm')">授权</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
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
export default {
  props: {
    resource: {
      type: Array,
      require: true
    },
    serviceName: {
      type: String
    }
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      let serviceName = this.serviceName;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formData.emails == '') {
            this.$message({
              message: '请填写授权人邮箱！',
              type: 'warning'
            });
            return;
          }
          // 查询当前服务instance实例展现
          _api.post("/center/service/auth", {
            "serviceName": serviceName,
            "emails":this.formData.emails.split(",")
          }).then((res) => {
            if(res.ret==1){
              this.visible = false;
              _this.showList(row.serviceName);
              this.refreshTable();
            } else {
              this.$message({
                type: 'error',
                message: '新增权限失败！' + res.error.msg
              });
            }
          }, (err) => {
            this.$message({
              type: 'error',
              message: '新增权限失败！'
            });
          });
          this.resetForm(formName);

        } else {
          return false;
        }
      });
    },
    showList(name) {
      // 查询当前服务instance实例展现
      _api.get("/center/service/auth/list", {
        serviceName: name
      }).then((res) => {
        this.showInfoList = res.data;
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询授权列表失败！'
        });
      });
    },
    newAuth(name){
      this.visible = true;
    },
    refreshTable(){
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      })
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
    },
    deleteAuth(row){
      let _this = this;
      // 查询当前服务instance实例展现
      _api.get("/center/service/auth/del", {
        serviceName: row.serviceName,
        email: row.userEmail
      }).then((res) => {
        _this.showList(row.serviceName);
      }, (err) => {
        this.$message({
          type: 'error',
          message: '删除服务失败！'
        });
      });
    }
  },
  watch: {
    // 如果 `resource` 发生改变，这个函数就会运行
    resource: {
      handler: function (newValue, oldValue) {
        this.showInfoList = newValue;
      }
      ,
      immediate: true
    }
  },
  data() {
    return {
      visible: false,
      curr: null,
      showInfoList: [],
      formData: {
        emails: ""
      },
      showForm: true
    }
  }
}
</script>