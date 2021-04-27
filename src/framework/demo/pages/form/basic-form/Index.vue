<template>
  <div class="cmp-wrapper">
    <basic-container>
      <div slot="header-left">综合表单 -- 带验证</div>
      <basic-form />
    </basic-container>
    <basic-container>
      <div slot="header-left">水平小表单 -- 一般用于查询区</div>
      <inline-form />
    </basic-container>
  </div>
</template>


<script>
import BasicForm from "./../../../blocks/mc-basic-form/index.js";
import InlineForm from "./../../../blocks/mc-inline-form/index.js";

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  components: {
    BasicForm,
    InlineForm
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
