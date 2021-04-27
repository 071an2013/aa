<template>
  <div v-if="raw==1">
    <router-view />
  </div>
  <el-container v-else class="fill-in header-main-layout" :class="$root.siteRenderer">
    <el-header>
      <TopBar />
    </el-header>
    <el-main ref="mainContainer" class="main-container">
      <div class="main-back">
        <transition name="fade">
          <template v-if="isTabbedMenu">
            <keep-alive :max="6">
              <router-view />
            </keep-alive>
          </template>
          <router-view v-else />
        </transition>
      </div>
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
  name: "HeaderTiledMainLayout",
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
<style lang="scss" scoped>
.main-container {
  padding: 0;
  .main-back {
    background: #fff;
    margin: 0 18px;
    padding: 20px;
  }
  /deep/ .basic-container {
    background: #f9f9f9;
    .basic-container-header {
      border-bottom: solid #e2e4e6 1px;
    }
  }
  /deep/ .raw {
    background: #fff;
    .card-panel {
      background: #f9f9f9;
    }
  }
}
</style>