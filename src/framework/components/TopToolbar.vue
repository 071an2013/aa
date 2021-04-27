<template>
  <div class="top-toolbar" :class="theme">
    <!--填充坑位-->
    <template v-for="(cmp) in childrenComponents">
      <component :is="cmp" :key="cmp.name" />
    </template>
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
  computed: {
    childrenComponents() {
      return this.$root.getSlotComponents("header-right");
    }
  }
};
</script>
