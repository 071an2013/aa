<template>
  <div class="cmp-wrapper">
    <query-form @query="onQuery" ref="query-form" />
    <div class="table-container">
      <div class="table-cmd-bar">
        <div class="left">
          <form-dialog name="数据条目" type="add" @confirm="onAddRow">
            <el-button icon="el-icon-plus" type="primary" size="small">新建</el-button>
          </form-dialog>
          <el-button type="success" size="small" icon="el-icon-d-caret">导入/导出</el-button>
        </div>
        <div class="right"></div>
      </div>
      <div class="selection-info">
        <i class="el-icon-info"></i>已选项
        <span class="num">{{ table.selection.length }}</span> 项
        <el-button type="text" @click="toggleSelection('invert')">反选</el-button>
        <el-button type="text" @click="toggleSelection()">清空</el-button>
      </div>
      <el-table
        :data="table.rows"
        @selection-change="onSelectionChanged"
        style="width: 100%"
        :header-cell-style="{backgroundColor: '#fafafa'}"
        ref="my-table"
      >
        <el-table-column label="id" type="selection" prop="id" width="50"></el-table-column>
        <el-table-column label="名称" prop="title"></el-table-column>
        <el-table-column label="紧急度" prop="level" width="70"></el-table-column>
        <el-table-column label="接收端" prop="terminal" width="70"></el-table-column>
        <el-table-column label="展示类型" prop="displayType" width="150px"></el-table-column>
        <el-table-column label="关联标识" prop="associateId" width="80"></el-table-column>
        <el-table-column label="约定参数">
          <template slot-scope="scope">{{ scope.row.params.join(', ') }}</template>
        </el-table-column>
        <el-table-column label="状态" prop="status" width="60"></el-table-column>
        <el-table-column label="失效时间" prop="expire" width="120px"></el-table-column>
        <el-table-column label="所属系统" prop="system" width="90"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <form-dialog
              name="数据条目"
              type="edit"
              :record="scope.row"
              :recordIndex="scope.$index"
              @confirm="onEditRow"
            >
              <el-button type="text" size="mini">编辑1</el-button>
            </form-dialog>
            <delete-confirm @confirm="onDeleteRow(scope.$index)">
              <el-button type="text" size="mini">废弃</el-button>
              <div slot="message">您确认删除当前数据项吗？</div>
            </delete-confirm>
            <el-dropdown size="small">
              <span class="el-dropdown-title">
                <el-button type="text" size="mini">更多</el-button>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-view"></i>查看
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-view"></i>查看2
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-view"></i>查看3
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          v-if="pagerVisible"
          @size-change="onPageSizeChanged"
          @current-change="onPageChanged"
          :current-page.sync="pager.pageIndex"
          :page-size="pager.pageSize"
          :page-sizes="pager.pageSizes"
          layout="sizes, prev, pager, next"
          :total="pager.total"
          background
        />
      </div>
    </div>
  </div>
</template>


<script>
import QueryForm from "./components/QueryForm";
import FormDialog from "./components/FormDialog";
import DeleteConfirm from "./components/DeleteConfirm";

export default {
  name: "McQueryTable",
  components: {
    QueryForm,
    FormDialog,
    DeleteConfirm
  },
  data() {
    return {
      querys: {
        // 初始查询条件
      },
      table: {
        rows: [],
        selection: []
      },
      pager: {
        pageSize: 10,
        pageIndex: 1, // 从 1 开始
        total: 0,
        pageSizes: [10, 30, 50]
      }
    };
  },
  computed: {
    pagerVisible() {
      return this.pager.total > this.pager.pageSize;
    }
  },
  mounted() {
    this.loadData(1);
  },
  methods: {
    /**
     * 造点假数据，实际项目中用 ajax 调用替换。
     * @params.pageIndex
     * @params.pageSize
     */
    getTestData(params) {
      let total = 200;
      const getFakeData = index => {
        return {
          id: index,
          title: "测试" + index,
          level: "普通",
          terminal: "iOS",
          displayType: "通知---订单通知",
          associateId: "ssu_id",
          params: ["order_id"],
          status: "正常",
          expire: "2018-10-01",
          system: "订单"
        };
      };
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          let testData = [];
          let startedIndex = (params.pageIndex - 1) * params.pageSize;
          for (var i = 0; i < params.pageSize; i++) {
            testData.push(getFakeData(i + startedIndex));
          }
          resolve({
            rows: testData,
            total: total
          });
        }, 100);
      });
    },
    loadData(pageIndex) {
      let querys = this.$refs["query-form"].getQuerys();
      this.getTestData(
        Object.assign(
          {
            pageIndex: pageIndex,
            pageSize: this.pager.pageSize
          },
          querys
        )
      ).then(data => {
        this.table.rows = data.rows;
        this.pager.total = data.total;
      });
      this.pager.pageIndex = pageIndex;
    },
    onQuery(querys) {
      this.loadData(1);
    },
    /**
     * 新建数据条目
     */
    onAddRow(row) {
      this.table.rows.unshift(row);
    },
    /**
     * 编辑数据条目
     */
    onEditRow(row, rowIndex) {
      alert("aa");
      this.$set(this.table.rows, rowIndex, row);
    },
    /**
     * 删除数据条目
     */
    onDeleteRow(rowIndex) {
      this.table.rows.splice(rowIndex, 1);
    },
    onSelectionChanged(selectedRows) {
      this.table.selection = selectedRows;
    },
    toggleSelection(action) {
      if (action === 'invert') {
        this.table.rows.forEach(row => {
          this.$refs["my-table"].toggleRowSelection(row);
        })
      }  else {
        this.$refs["my-table"].clearSelection();
      }
    },
    onPageSizeChanged(pageSize) {
      this.pager.pageSize = pageSize;
      this.loadData(1);
    },
    onPageChanged(pageIndex) {
      this.loadData(pageIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.cmp-wrapper {
  .table-container {
    .table-cmd-bar {
      margin-bottom: 10px;
      overflow: auto;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
    .selection-info {
      padding: 0 10px;
      margin-bottom: 10px;
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
      border-radius: 3px;
      i {
        margin-right: 5px;
        color: #1890ff;
      }
      .num {
        color: #1890ff;
      }
    }
    .el-table {
      margin-bottom: 20px;
    }
    .el-pagination {
      text-align: right;
    }
    .el-dropdown-title {
      cursor: pointer;
      color: #409eff;
      i {
        margin-left: 0;
      }
    }
  }
}
</style>
