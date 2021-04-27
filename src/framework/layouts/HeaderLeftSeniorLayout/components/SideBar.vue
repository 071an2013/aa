<template>
  <!-- style="top:0" -->
  <div class="left-pane" :class="{collapsed: !!$root.isMenuCollapsed}">
    <!-- <Logo /> -->
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
    <i @click="toggleMenu"  class="icon-switcher" :class="{rotate: $root.isMenuCollapsed}"></i>
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
  methods: {
    toggleMenu() {
      this.$root.setMenuCollapsedState(!this.$root.isMenuCollapsed);
    }
  },
  components: {
    Logo,
    SearchBox,
    McMenuItem
  }
};
</script>

<style lang="scss" scoped>
.icon-switcher{
  position: absolute;
  width: 26px;
  height: 26px;
  z-index: 99999;
  right: -12px;
  top: 9px;
  background: #fff url('../../../../assets/images/switcher.png');
  background-size: 26px 26px;
  border-radius: 50%;
}
.rotate{
  transform: rotate(180deg); 
}
</style>