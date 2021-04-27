<template>
  <div class="global-component" :class="$root.siteRenderer">
    <!--
      DevTool 用于在站点右下角显示一个设置图标，打开设置面板，可切换站点显示样式，
      如切换布局方式、皮肤等。生产环境不需要时，可注释掉或在 site.config.js 中
      将 isShowDevTool 配置为 false。
    -->
    <DevTool v-if="isShowDevTool" />
    <MobileSideBar />
    <div v-if="isShowPageMask" class="page-mask" @click="toggleMenu"></div>
  </div>
</template>

<script>
import siteOptions from "@/config/index";
import DevTool from "@/framework/components/DevTool";
import MobileSideBar from "@/framework/layouts/MobileSideBar";

export default {
  components: { DevTool, MobileSideBar },
  computed: {
    isShowDevTool() {
      return (
        siteOptions["isShowDevTool"] && this.$root.siteRenderer != "mobile"
      );
    },
    isShowPageMask() {
      return this.$root.siteRenderer != "pc" && !this.$root.isMenuCollapsed;
    }
  },
  methods: {
    toggleMenu() {
      this.$root.setMenuCollapsedState(!this.$root.isMenuCollapsed);
    }
  }
};
</script>
