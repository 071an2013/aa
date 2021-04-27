<template>
  <div class="footer" :class="$root.siteRenderer">
    <div>
      <span>{{copyrightText}}</span>
      <span class="department">{{departmentText}}</span>
    </div>
    <div>Powered by RAD {{version}}</div>
  </div>
</template>

<script>
import siteOptions from "@/config/index";

export default {
  data() {
    return {
      copyrightText: siteOptions["copyrightText"],
      departmentText: siteOptions["departmentText"],
      version: __VERSION__
    };
  }
};
</script>
