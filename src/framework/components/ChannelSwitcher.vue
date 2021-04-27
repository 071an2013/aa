<template>
    <el-dropdown style="margin-right:10px;">
      <span class="el-dropdown-link">
        切换环境
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      &nbsp;
      <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="local"><a href="http://gateway-center.test.yunshanmeicai.com">Test</a></el-dropdown-item>
          <el-dropdown-item command="test2"><a href="https://gateway-center-test2.qc.yunshanmeicai.com">qc</a></el-dropdown-item>
          <el-dropdown-item command="stage"><a href="https://gateway-center.stage.yunshanmeicai.com">Stage</a></el-dropdown-item>
          <el-dropdown-item command="online"><a href="https://gateway-center.yunshanmeicai.com">Online</a></el-dropdown-item>
      </el-dropdown-menu>
      &nbsp;
    </el-dropdown>
</template>


<script>
    export default {
        methods: {
            handleCommand(command) {
                location.href = "http://gateway-center" + (command == 'online' ? "" : command)
                        + ".yunshanmeicai.com";
            }
        }
    }
</script>

<script>
    export default {
        name: "ChannelSwitcher"
    };
</script>