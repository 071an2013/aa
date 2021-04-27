<template>
  <div class="user-profile-content">
    <el-dropdown>
      <div class="v-middle-box user-info">
        <i class="el-icon-user-solid"></i>
        <span class="user-name">{{currentUser.name || '未登录用户'}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>后台首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item v-if="currentUser.name">
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import siteOptions from "@/config/index";

export default {
  name: "UserProfile",
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    logout() {
      siteOptions["onLogout"](this.currentUser);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>