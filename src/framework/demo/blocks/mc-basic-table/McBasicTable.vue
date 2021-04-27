<template>
  <div class="select-table">
    <el-row v-show="selections.length > 0" :gutter="10" class="table-toolbar">
      <el-col :span="12">
        <el-button
          type="danger"
          icon="el-icon-remove"
          @click="handleDelete(selections.map(i => i.id))"
          size="small"
        >全部删除({{selections.length}})</el-button>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品单价" width="80">
        <template slot-scope="scope">
          <span>￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="入库日期" width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 4px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="progress" label="进度" width="200" align="center">
        <template slot-scope="scope">
          <div style="text-align:left;">
            <el-progress :percentage="scope.row.progress"></el-progress>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="86">
        <template slot-scope="scope">
          <badge :status="statusMap[scope.row.status.value]" :text="status[scope.row.status.value]"></badge>
        </template>
      </el-table-column>
      <el-table-column prop="switch" label="开关" width="86" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.switch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="handleSwitch"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="标签" width="86" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.price > 100 ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.price > 100 ? '优质' : '普通'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="text" size="mini">弹窗详情</el-button>
          <el-button @click="handleView2(scope.row)" type="text" size="mini">跳转详情</el-button>
          <el-button @click="handleDelete([scope.row].map(i => i.id))" type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Badge from "./components/Badge";

export default {
  name: "McBasicTable",
  components: {
    Badge
  },
  data() {
    return {
      status: ["关闭", "运行中", "已上线", "异常", "警告"],
      statusMap: ["default", "processing", "success", "error", "warning"],
      tableData: [
        {
          id: 0,
          name: "矿泉水",
          price: "1",
          progress: 60,
          status: {
            text: "关闭",
            value: 0
          },
          switch: 0,
          date: "2018-05-02"
        },
        {
          id: 1,
          name: "吹风机",
          price: "125",
          progress: 80,
          status: {
            text: "运行中",
            value: 1
          },
          switch: 1,
          date: "2018-05-04"
        },
        {
          id: 2,
          name: "显示器",
          price: "998",
          progress: 90,
          status: {
            text: "已上线",
            value: 2
          },
          switch: 1,
          date: "2018-05-01"
        },
        {
          id: 3,
          name: "水杯",
          price: "23",
          progress: 100,
          status: {
            text: "异常",
            value: 3
          },
          switch: 0,
          date: "2018-05-03"
        },
        {
          id: 4,
          name: "笔记本",
          price: "5",
          progress: 50,
          status: {
            text: "警告",
            value: 4
          },
          switch: 1,
          date: "2018-05-02"
        },
        {
          id: 5,
          name: "鼠标垫",
          price: "37",
          progress: 40,
          status: {
            text: "已上线",
            value: 2
          },
          switch: 0,
          date: "2018-05-04"
        },
        {
          id: 6,
          name: "插线板",
          price: "78",
          progress: 30,
          status: {
            text: "已上线",
            value: 2
          },
          switch: 0,
          date: "2018-05-01"
        },
        {
          id: 7,
          name: "耳机",
          price: "166",
          progress: 20,
          status: {
            text: "已上线",
            value: 2
          },
          switch: 1,
          date: "2018-05-03"
        }
      ],
      selections: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selections = val;
    },
    handleDelete(idArray) {
      this.tableData = this.tableData.filter(i => !idArray.includes(i.id));
    },
    handleSwitch(val) {},
    handleView(row) {
      const content = `
          <div>商品名称：${row.name}</div>
          <div>商品单价：¥ ${row.price}</div>
          <div>入库日期：${row.date}</div>
        `;
      const title = "商品详情";
      this.$alert(content, title, {
        dangerouslyUseHTMLString: true,
        callback: () => {
          // TODO: MessageBox callback;
        }
      });
    },
    handleView2(row) {
      this.$router.push({
        path: "/demo/pages/table/select-table/" + row["id"]
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.select-table {
  .table-toolbar {
    margin-bottom: 6px;
  }
}
</style>
