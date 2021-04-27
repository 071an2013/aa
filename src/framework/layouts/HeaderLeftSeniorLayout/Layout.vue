<template>
  <div v-if="raw==1">
    <router-view />
  </div>
  <el-container v-else class="fill-in header-left-main-layout" :class="$root.siteRenderer">
    <el-container class="container-wrap">
      <!--顶部栏-->
      <TopBar />
      <div class="main-wrap">
        <div class="left-menu">
          <template>
            <!-- 左侧菜单栏 -->
            <el-aside
              v-if="$root.siteRenderer == 'pc'"
              :class="{collapsed: !!$root.isMenuCollapsed}"
            >
              <SideBar />
            </el-aside>
          </template>
        </div>
        <div class="right-main">
          <el-header>
            <TabsNav />
          </el-header>
          <!-- 主内容区 -->
          <el-main class="main-container">
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
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import { getIsTabbedMenu } from "@/framework/utils/config";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import TabsNav from "@/framework/components/TabsNav";
import Footer from "@/framework/components/Footer";
import LayoutMixin from "@/framework/layouts/LayoutMixin.js";
export default {
  name: "HeaderLeftMainLayout",
  mixins: [LayoutMixin],
  data() {
    return {
      isTabbedMenu: getIsTabbedMenu()
    };
  },
  components: {
    TopBar,
    SideBar,
    Footer,
    TabsNav
  }
};
</script>

<style lang="scss">
.container-wrap {
  width: 100%;
  height: 100%;
  flex-direction: column;
  .main-wrap {
    flex: 1;
    min-height: 0; // 兼容Firefox
    display: flex;
    height: calc(100% - 84px);
    .left-menu {
      .left-pane {
        top: 84px;
      }
    }
    .right-main {
      width: 300px;
      flex: 1;
      display: flex;
      min-width: 0; // 兼容Firefox
      flex-direction: column;
      .main-container {
        /* flex: 1; */
        /* overflow-y: auto; */
      }
    }
  }
}
</style>
