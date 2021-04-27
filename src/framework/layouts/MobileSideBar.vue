<template>
  <div
    v-if="$root.siteRenderer != 'pc'"
    class="left-pane mobile"
    :class="{collapsed: $root.isMenuCollapsed}"
  >
    <Logo />
    <SearchBox v-model="filterMenuKeyword" v-if="isShowMenuSearchBox" />
    <el-menu
      mode="vertical"
      ref="menu"
      :collapse="false"
      :router="false"
      :default-active="currentRoutePath"
      :default-openeds="openedMenus"
      @select="onMySelectMenuItem"
      class="left-menu"
    >
      <McMenuItem v-for="(item, index) in filteredMenu" :meta="item" :key="index" />
      <li v-if="!(filteredMenu && filteredMenu.length)" class="empty-content">未找到菜单</li>
    </el-menu>
  </div>
</template>

<script>
import MenuCommonMixin from "./MenuCommonMixin.js";
import Logo from "@/framework/components/Logo.vue";
import McMenuItem from "@/framework/components/McMenuItem";
import SearchBox from "@/framework/components/SearchBox";

export default {
  name: "MobileSideBar",
  mixins: [MenuCommonMixin],
  methods: {
    onMySelectMenuItem(path) {
      this.onSelectMenuItem(path);
      this.$root.setMenuCollapsedState(!this.$root.isMenuCollapsed);
    }
  },
  components: {
    Logo,
    McMenuItem,
    SearchBox
  }
};
</script>