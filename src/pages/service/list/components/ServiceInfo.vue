<template>
  <div>
    <div>
      <el-button type="warning" size="small" @click="showInstance(serviceName)" style="margin-left: 4px">刷新</el-button>
    </div>
    <el-table
        :data="instanceInfoList"
        cell-class-name="m-ellipsis"
        style="width: 100%; min-height: 300px; max-height: 400px; overflow-y: auto">
      <el-table-column
          prop="id"
          label="id"
          width="80">
      </el-table-column>
      <el-table-column
          prop="serviceName"
          label="实例名称"
          width="150">
        <template slot-scope="scope">
          {{scope.row.serviceName}}
          <el-tag v-if="scope.row.diff == 1" type="danger" size="small">上线，无cache</el-tag>
          <el-tag v-if="scope.row.diff == 2" type="warning" size="small">下线，有Cache</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="ip"
          label="ip地址"
      >
      </el-table-column>
      <el-table-column
          prop="status"
          sortable
          label="实例状态" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="primary">上线</el-tag>
          <el-tag v-if="scope.row.status == 5" type="info">注册中</el-tag>
          <el-tag v-if="scope.row.status == 9" type="warning">下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="cT"
          label="创建时间">
        <template slot-scope="scope">{{ formatDate(new Date(scope.row.cT), "yyyy-MM-dd") }}</template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--          prop="uT"-->
      <!--          label="修改时间">-->
      <!--      </el-table-column>-->
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
    showInstance(name) {
      // 查询当前服务instance实例展现
      _api.get("/center/service/instanceList", {
        serviceName: name
      }).then((res) => {
        this.instanceInfoList = res.data;
      }, (err) => {
        this.$message({
          type: 'error',
          message: '查询服务实例失败！'
        });
      });

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
    // 如果 `resource` 发生改变，这个函数就会运行
    resource: {
      handler: function (newValue, oldValue) {
        this.instanceInfoList = newValue;
      }
      ,
      immediate: true
    }
  },
  data() {
    return {
      curr: null,
      instanceInfoList: []
    }
  }
}
</script>