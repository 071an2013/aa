<template>
  <div class="cmp-wrapper">
    <basic-container>
      <div slot="header-left">分步表单 -- 带验证</div>
      <step-form />
    </basic-container>
  </div>
</template>


<script>
import StepForm from "./../../../blocks/mc-step-form/index.js";

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
    StepForm
  }
};
</script>


<style lang="scss" scoped>
.cmp-wrapper {
}
</style>
