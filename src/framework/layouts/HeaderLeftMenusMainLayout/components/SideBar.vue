<template>
  <div class="left-pane" :class="{collapsed: !!$root.isMenuCollapsed}">
    <SearchBox v-model="filterMenuKeyword" v-if="isShowMenuSearchBox" />
    <el-menu
      mode="vertical"
      ref="menu"
      :collapse="$root.isMenuCollapsed"
      :router="false"
      :default-active="currentRoutePath"
      :default-openeds="openedMenus"
      @select="onSelectMenuItem"
      class="left-menu"
      style="padding-top: 12px;"
    >
      <McMenuItem v-for="(item, index) in filteredMenu" :meta="item" :key="index" />
      <li v-if="!(filteredMenu && filteredMenu.length)" class="empty-content">未找到菜单</li>
    </el-menu>
    <SideBarSwitcher v-if="isLeftPaneCollapsable" />
  </div>
</template>


<script>
import MenuCommonMixin from "@/framework/layouts/MenuCommonMixin.js";
import siteOptions from "@/config/index";
import SearchBox from "@/framework/components/SearchBox";
import McMenuItem from "@/framework/components/McMenuItem";
import SideBarSwitcher from "@/framework/components/SideBarSwitcher";
export default {
  name: "SideBar",
  mixins: [MenuCommonMixin],
  props: {
    menus: {
      type: Array
    }
  },
  data() {
    return {
      isLeftPaneCollapsable: siteOptions["isLeftPaneCollapsable"]
    };
  },
  components: {
    SearchBox,
    SideBarSwitcher,
    McMenuItem
  }
};
</script>
