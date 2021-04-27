<template>
  <div class="logo-wrapper" :class="{collapsed: !isShowSiteName}">
    <!--PC上的 logo-->
    <div v-if="type == 'pc'" class="v-middle-box logo-pc" @click="toIndex">
      <img class="small-logo" src="@/assets/images/logo.png" />
      <div class="site-name">{{siteName}}</div>
    </div>
    <!--手机上的 logo-->
    <template v-else>
      <div class="v-middle-box">
        <img class="small-logo" src="@/assets/images/logo.png" />
      </div>
      <SideBarSwitcher theme="icon" />
    </template>
  </div>
</template>

<script>
import siteOptions from "@/config/index";
import SideBarSwitcher from "@/framework/components/SideBarSwitcher";

export default {
  components: { SideBarSwitcher },
  props: {
    type: {
      type: String,
      default: "pc"
    },
    isAlwaysShowSiteName: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      siteName: siteOptions["siteName"]
    };
  },
  computed: {
    isShowSiteName() {
      return !(this.$root.isMenuCollapsed && !this.isAlwaysShowSiteName);
    }
  },
  methods: {
    toIndex() {
      window.location.hash = "/";
    }
  }
};
</script>
