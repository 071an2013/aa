<template>
  <div
    v-if="theme == 'icon'"
    class="side-bar-icon-switcher"
    :class="{collapsed: $root.isMenuCollapsed}"
    @click="toggleMenu"
  >
    <i class="el-icon-arrow-right"></i>
  </div>
  <div v-else class="side-bar-default-switcher" :class="theme" @click="toggleMenu">
    <i :class="'el-icon-caret-' + ($root.isMenuCollapsed ? 'right' : 'left')"></i>
  </div>
</template>


<script>
export default {
  props: {
    theme: {
      type: String,
      default: ""
    }
  },
  methods: {
    toggleMenu() {
      this.$root.setMenuCollapsedState(!this.$root.isMenuCollapsed);
    }
  }
};
</script>
