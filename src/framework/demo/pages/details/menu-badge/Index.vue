<template>
  <div>
    <basic-container>
      <ul>
        <li>
          消息文本：
          <el-input v-model="message" style="width: 200px"></el-input>
          <i style="color:#AAA;padding-left:5px;">点击下面的链接查看调用效果：</i>
        </li>
        <li>
          <span @click="Test($event)">/home</span>
          <b>[home]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/details/menu-badge</span>
          <b>[导航消息]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/dashboard/common</span>
          <b>[dashboard/通用]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/details/data-display</span>
          <b>[信息展示/概要信息]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/details/slider</span>
          <b>[信息展示/轮播]</b>
        </li>
        <li>
          <span @click="Test($event)">/iframe/?url=https://www.google.com</span>
          <b>[子集外链/谷歌]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/charts/complex</span>
          <b>[图表/复杂图表]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/charts/basic/line</span>
          <b>[图表/基础图表/line]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/charts/basic/bar</span>
          <b>[图表/基础图表/bar]</b>
        </li>
        <li>
          <span @click="Test($event)">/demo/pages/charts/basic/pie</span>
          <b>[图表/基础图表/pie]</b>
        </li>
      </ul>
      <div class="code">
        <pre>
调用示例:
this.$root.setMenuMessage(
  path, // 设置消息的导航路径
  message // 消息内容，设置为0可取消 Number|String
)

可在 @/config/plugins/badge.js 配置 badge 的样式。
      </pre>
      </div>
    </basic-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 100,
      type: "primary"
    };
  },
  methods: {
    Test($event) {
      const path = $event.srcElement.innerText;
      this.$root.setMenuMessage(path, this.message);
    }
  }
};
</script>

<style scoped lang="scss">
li {
  list-style: none;
  span {
    display: inline-block;
    width: 280px;
    margin-top: 10px;
    padding: 10px;
    margin-right: 10px;
    cursor: pointer;
    border: solid 1px transparent;
    &:hover {
      border: solid 1px #ccc;
    }
  }
  b {
    display: inline-block;
    width: 170px;
  }
}
.code {
  padding: 20px;
  margin-top: 20px;
  color: #666;
  background: #e6e7ec;
  border-radius: 5px;
}
</style>
