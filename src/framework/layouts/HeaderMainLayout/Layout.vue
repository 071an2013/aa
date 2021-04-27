<template>
  <div v-if="raw==1">
    <router-view />
  </div>
  <el-container v-else class="fill-in header-main-layout" :class="$root.siteRenderer">
    <el-header>
      <TopBar />
      <TabsNav />
    </el-header>
    <el-main ref="mainContainer" class="main-container">
      <transition name="fade">
        <template v-if="isTabbedMenu">
          <keep-alive :max="6">
            <router-view />
          </keep-alive>
        </template>
        <router-view v-else />
      </transition>
      <Footer />
    </el-main>
  </el-container>
</template>

<script>
import { getIsTabbedMenu } from "@/framework/utils/config";
import TopBar from "./components/TopBar.vue";
import Footer from "@/framework/components/Footer";
import TabsNav from "@/framework/components/TabsNav";
import LayoutMixin from "@/framework/layouts/LayoutMixin.js";
export default {
  name: "HeaderMainLayout",
  mixins: [LayoutMixin],
  data() {
    return {
      isTabbedMenu: getIsTabbedMenu()
    };
  },
  components: {
    TopBar,
    Footer,
    TabsNav
  }
};
</script>
