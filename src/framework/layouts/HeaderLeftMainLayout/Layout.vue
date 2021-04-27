<template>
  <div v-if="raw==1">
    <router-view />
  </div>
  <el-container v-else class="fill-in header-left-main-layout" :class="$root.siteRenderer">
    <template>
      <!--左侧菜单栏-->
      <el-aside v-if="$root.siteRenderer == 'pc'" :class="{collapsed: !!$root.isMenuCollapsed}">
        <SideBar />
      </el-aside>
    </template>
    <el-container>
      <!--顶部栏-->
      <el-header>
        <TopBar />
        <TabsNav />
      </el-header>
      <!--主内容区-->
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
