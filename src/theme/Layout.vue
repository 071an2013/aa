<template>
  <!--自定义皮肤，示例文件-->
  <div class="fill-in my-layout" style="display:flex;">
    <div style="width:300px;overflow:auto;">
      <pre>{{mainMenuConfig}}</pre>
    </div>
    <div class="main-container" style="flex:1;overflow:auto;">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import siteOptions from "@/config/index";

export default {
  computed: {
    ...mapGetters(["mainMenuConfig"])
  }
};
</script>

<style lang="sass" scoped>
</style>