<template>
  <div class="left-pane" :class="{collapsed: !!$root.isMenuCollapsed}" style="top:0">
    <Logo />
    <SearchBox v-model="filterMenuKeyword" v-if="isShowMenuSearchBox" />
    <el-menu
      mode="vertical"
      ref="menu"
      :collapse="$root.isMenuCollapsed"
      :router="false"
      :default-active="currentRoutePath"
      :default-openeds="openedMenus"
      @select="onSelectMenuItem"
      class="left-main-menu"
    >
      <McMenuItem v-for="(item, index) in filteredMenu" :meta="item" :key="index" />
      <li v-if="!(filteredMenu && filteredMenu.length)" class="empty-content">未找到菜单</li>
    </el-menu>
  </div>
</template>

<script>
import MenuCommonMixin from "@/framework/layouts/MenuCommonMixin.js";
import Logo from "@/framework/components/Logo.vue";
import SearchBox from "@/framework/components/SearchBox";
import McMenuItem from "@/framework/components/McMenuItem";

export default {
  name: "SideBar",
  mixins: [MenuCommonMixin],
  components: {
    Logo,
    SearchBox,
    McMenuItem
  }
};
</script>
