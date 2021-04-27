<template>
  <div class="breadcrumb-wrapper" v-if="breadcrumb.length">
    <div class="title" v-if="isShowTitle">{{ hostedMenuPath ? hostedMenuTitle : routerTitle }}</div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!--中间路径面包屑-->
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbWithoutLast"
          :key="index"
        >{{ item['name'] }}</el-breadcrumb-item>
        <!--若是普通模式-->
        <template v-if="!hostedMenuPath">
          <el-breadcrumb-item v-if="lastBreadcrumb">{{ lastBreadcrumb['name'] }}</el-breadcrumb-item>
        </template>
        <!--若是复杂模式-->
        <template v-else>
          <el-breadcrumb-item
            v-if="lastBreadcrumb"
            :to="hostedMenuPath"
          >{{ lastBreadcrumb['name'] }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ hostedMenuTitle }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getPageRouterList } from "@/framework/utils/layout";
export default {
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(["mainMenuConfig"]),
    routerTitle() {
      return this.breadcrumb[this.breadcrumb.length - 1]["name"];
    },
    routerPath() {
      return this.$route.fullPath;
    },
    hostedMenuPath() {
      let routeMeta = this.$route.meta || {};
      return routeMeta["menu"];
    },
    hostedMenuTitle() {
      let routeMeta = this.$route.meta || {};
      return routeMeta["title"];
    },
    breadcrumb() {
      let routerPath = this.getCurrentRoutePath();
      if (routerPath != "/") {
        return getPageRouterList(this.mainMenuConfig, routerPath);
      } else {
        return [];
      }
    },
    breadcrumbWithoutLast() {
      return this.breadcrumb.slice(0, -1);
    },
    lastBreadcrumb() {
      let count = this.breadcrumb.length;
      return count > 0 ? this.breadcrumb[count - 1] : null;
    }
  },
  methods: {
    getCurrentRoutePath() {
      return this.hostedMenuPath || this.routerPath || "/";
    }
  }
};
</script>
