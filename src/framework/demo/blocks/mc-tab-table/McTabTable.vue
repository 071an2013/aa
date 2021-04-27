<template>
  <div class="tab-table">
    <el-tabs v-model="tabKey" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :label="tab.tab" :name="tab.category" :key="tab.category">
        <el-table :data="dataSource[tab.category]" style="width: 100%">
          <el-table-column
            v-for="(item, index) in columns"
            :label="item.title"
            :prop="item.dataIndex"
            :key="item.name"
            :width="item.name !== 'action' ? (item.width || 150) : item.width"
          >
            <template slot-scope="scope">
              <span v-if="item.name !== 'action'">{{scope.row[item.dataIndex]}}</span>
              <span v-else>
                <edit-dialog
                  :row="scope.row"
                  :action.sync="item.name"
                  :index="scope.$index"
                  :tabKey="tabKey"
                  @handleMod="handleMod"
                ></edit-dialog>
                <delete-balloon
                  :action.sync="item.name"
                  :index="scope.$index"
                  :tabKey="tabKey"
                  @handleRemove="handleRemove"
                ></delete-balloon>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DeleteBalloon from "./components/DeleteBalloon";
import EditDialog from "./components/EditDialog";
import response from "./tab-table.json";

export default {
  components: {
    DeleteBalloon,
    EditDialog
  },
  name: "McTabTable",

  data() {
    return {
      tabKey: "all",
      dataSource: [],
      tabs: [
        { tab: "全部", category: "all" },
        { tab: "已发布", category: "inreview" },
        { tab: "审核中", category: "released" },
        { tab: "已拒绝", category: "rejected" }
      ],
      columns: [
        {
          title: "标题",
          dataIndex: "title",
          name: "title"
        },
        {
          title: "作者",
          dataIndex: "author",
          name: "author"
        },
        {
          title: "状态",
          dataIndex: "status",
          name: "status"
        },
        {
          title: "发布时间",
          dataIndex: "date",
          name: "date"
        },
        {
          title: "操作",
          name: "action"
        }
      ],
      visible: false
    };
  },

  created() {},

  mounted() {
    this.dataSource = response.data;
  },

  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    handleRemove(index, tabKey) {
      this.dataSource[tabKey].splice(index, 1);
    },
    handleMod(row, index, tabKey) {
      this.$set(this.dataSource[tabKey], index, row);
    }
  }
};
</script>

<style>
.tab-table {
}
</style>
