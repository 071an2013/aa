<template>
  <div class="top-bar" :class="$root.siteRenderer" style="padding-left:0">
    <div class="top-bar-left">
      <SideBarSwitcher v-if="$root.siteRenderer == 'pc'" theme="icon" />
      <Logo v-else :type="$root.siteRenderer" />
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

export default {
  name: "TopBar",
  components: {
    Logo,
    TopToolbar,
    SideBarSwitcher
  }
};
</script>
