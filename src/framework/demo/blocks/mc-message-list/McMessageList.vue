<template>
  <div class="mc-message-list">
    <el-tabs v-model="activeTab" @tab-click="switchTab">
      <el-tab-pane label="我的消息" name="message">
        <div class="message-item" v-for="message in messageList" :key="message.title">
          <a href="#" class="title">{{message.title}}</a>
          <div class="date">{{message.date}}</div>
        </div>
        <el-button type="text" class="show-more">查看全部消息</el-button>
      </el-tab-pane>
      <el-tab-pane label="待我处理" name="todo">
        <p class="placeholder">暂无数据</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "McMessageList",

  data() {
    return {
      activeTab: "message",
      messageList: [
        { title: "关于淘宝网存储设备商品发布规范的公告", date: "2017/01/06" },
        { title: "加强淘宝网电动四轮车类目准入的公告", date: "2017/01/06" },
        { title: "淘宝网VR头盔商品发布规范的公告", date: "2017/01/06" },
        { title: "加强淘宝网农药类目准入的公告", date: "2017/01/06" },
        {
          title: "淘宝网2017年春节发货时间及交易超时调整公告",
          date: "2017/01/06"
        }
      ]
    };
  },
  methods: {
    switchTab(tab, event) {
      console.log(tab.name);
    }
  },

  created() {}
};
</script>

<style lang="scss" scoped>
.mc-message-list {
  .el-tabs__content {
    color: #666;
    font-size: 14px;
  }
  .message-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid rgb(244, 244, 244);

    a.title {
      color: #666;
      text-decoration: none;
    }
    .date {
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
  .show-more {
    display: block;
    margin: 20px auto;
    padding: 0;
  }
}
</style>
