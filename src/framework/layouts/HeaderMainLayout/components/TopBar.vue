<template>
  <div class="top-bar" :class="$root.siteRenderer" v-cloak>
    <Logo :type="$root.siteRenderer" style="padding-left:0" />
    <div v-if="$root.siteRenderer == 'pc'" class="top-bar-menu" ref="menuContainer">
      <el-menu
        mode="horizontal"
        :show-timeout="0"
        :collapse="false"
        :router="false"
        :default-active="currentRoutePath"
        @select="onSelectMenuItem"
        class="top-main-menu"
        ref="menu"
      >
        <McMenuItem v-for="(item, index) in mainMenuConfig" :meta="item" :key="index" />
        <template v-if="moreMenu.length">
          <el-submenu index="more" class="moreMenu">
            <template slot="title">
              <span>...</span>
            </template>
            <el-menu
              :key="moreMenu.length"
              :show-timeout="0"
              :default-openeds="moreMenuOpenedIDs"
              :default-active="currentRoutePath"
              @select="onSelectMenuItem"
            >
              <McMenuItem v-for="(item, index) in moreMenu" :meta="item" :key="index" />
            </el-menu>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="top-bar-right">
      <TopToolbar />
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import MenuCommonMixin from "@/framework/layouts/MenuCommonMixin.js";
import { Menu } from "@/framework/utils/layout";
import Logo from "@/framework/components/Logo";
import McMenuItem from "@/framework/components/McMenuItem";
import TabsNav from "@/framework/components/TabsNav";
import TopToolbar from "@/framework/components/TopToolbar";

export default {
  name: "TopBar",
  mixins: [MenuCommonMixin],
  computed: {
    moreMenuOpenedIDs() {
      return this.getMenuOpenedIDs(this.moreMenu);
    }
  },
  created() {
    this.initMoreMenuContainer();
  },
  components: {
    Logo,
    McMenuItem,
    TabsNav,
    TopToolbar
  }
};
</script>
