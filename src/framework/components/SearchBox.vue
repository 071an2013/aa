<template>
  <div class="search-box-wrapper" :class="{highlight: !!value}">
    <el-input
      :value="value"
      placeholder="过滤菜单..."
      size="mini"
      suffix-icon="el-icon-search"
      clearable
      @input="valueChanged"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    valueChanged(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
