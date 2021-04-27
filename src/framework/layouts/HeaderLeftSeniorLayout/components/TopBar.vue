<template>
  <div class="top-bar" :class="$root.siteRenderer" style="padding-left:0; flex-shrink: 0;">
    <div class="v-middle-box logo-pc" @click="toIndex">
      <img class="small-logo" src="@/assets/images/logo2.png" />
      <div class="site-name">{{siteName}}</div>
    </div>
    <div class="top-bar-left">
      <!-- <SideBarSwitcher v-if="$root.siteRenderer == 'pc'" theme="icon" /> -->
      <!-- <Logo v-else :type="$root.siteRenderer" /> -->
    </div>
    <div style="flex:1"></div>
    <div class="top-bar-right">
      <TopToolbar theme="dark" />
    </div>
  </div>
</template>

<script>
import Logo from "@/framework/components/Logo.vue";
import SideBarSwitcher from "@/framework/components/SideBarSwitcher";
import TopToolbar from "@/framework/components/TopToolbar";
import siteOptions from "@/config/index";

export default {
  name: "TopBar",
  data(){
    return {
      siteName: siteOptions["siteName"]
    }
  },
  methods: {
    toIndex() {
      window.location.hash = "/";
    }
  },
  components: {
    Logo,
    TopToolbar,
    SideBarSwitcher
  }
};
</script>

<style lang="scss" scoped>
.logo-pc{
  background: #2B3940;
  width: 174px;
  img{
    width: 22px;
  }
  .site-name{
    padding-left: 10px;
    color: #00B074;
    font-size: 22px;
    font-weight: 600;
  }
}
</style>
