<template>
  <div>
    <div class="dev-settings" :class="{collapsed: visible == '0', rad: isUseRadCli}">
      <template v-if="isUseRadCli">
        <!--TODO: iframe 加载功能待完善-->
        <div v-if="isLoading" style="background:#F00"></div>
        <iframe
          :src="radDesignerUrl"
          class="fill-in rad-designer-iframe"
          @load="onRadDesignerLoaded"
        />
      </template>
      <template v-else>
        <el-form
          class="site-options"
          ref="siteOptions"
          :model="siteOptions"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="改变布局">
            <el-radio-group
              v-model="siteOptions.layout"
              @change="changeLayout"
              class="my-radio-group"
            >
              <el-radio label="HeaderLeftMainLayout" class="margin">
                <div class="layout-icon-wrapper">
                  <div class="layout-icon-header" style="left: 14px;"></div>
                  <div class="layout-icon-side-left menu-part"></div>
                </div>
                <div class="my-radio-label">左侧菜单</div>
              </el-radio>
              <el-radio label="HeaderMainLayout" class="margin">
                <div class="layout-icon-wrapper">
                  <div class="layout-icon-header menu-part"></div>
                </div>
                <div class="my-radio-label">顶部菜单</div>
              </el-radio>
              <el-radio label="HeaderLeftMenusMainLayout" class="margin">
                <div class="layout-icon-wrapper">
                  <div class="layout-icon-header menu-part"></div>
                  <div class="layout-icon-side-left menu-part" style="top: 14px;"></div>
                </div>
                <div class="my-radio-label">顶部+左侧</div>
              </el-radio>
              <el-radio label="HeaderTiledMainLayout">
                <div class="layout-icon-wrapper">
                  <div class="layout-icon-header menu-part"></div>
                  <div class="layout-top-tint"></div>
                </div>
                <div class="my-radio-label">顶部平铺</div>
              </el-radio>
              <el-radio label="HeaderLeftSeniorLayout">
                <div class="layout-icon-wrapper">
                  <div class="layout-icon-header"></div>
                  <div class="layout-icon-side-left menu-part layout-top-small"></div>
                  <i class="point"></i>
                </div>
                <div class="my-radio-label">左侧small</div> <!-- 成都定制皮肤 -->
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="切换皮肤">
            <el-radio-group
              :disabled="themeDisabled"
              v-model="siteOptions.theme"
              @change="changeTheme"
              class="my-radio-group"
            >
              <el-radio label="default">
                <div class="theme-icon" style="background-color: #002140;"></div>
                <div class="my-radio-label">默认(深色)</div>
              </el-radio>
              <el-radio label="green">
                <div class="theme-icon" style="background-color: #48c570;"></div>
                <div class="my-radio-label">绿色</div>
              </el-radio>
              <el-radio label="tint">
                <div class="theme-icon" style="background-color: #eee;"></div>
                <div class="my-radio-label">浅色</div>
              </el-radio>
            </el-radio-group>
            <p v-if="themeDisabled" class="theme-msg el-icon-info"> ‘左侧small’ 布局暂时不支持切换皮肤</p>
          </el-form-item>
          <el-form-item label="多页签模式">
            <el-radio-group v-model="siteOptions.isTabbedMenu" @change="changeTabbed">
              <el-radio v-for="item in menuTypes" :label="item.id" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <!--显隐按钮-->
      <div class="toggle-btn" @click="toggleToolVisible">
        <i v-if="visible == 1" class="el-icon-close"></i>
        <i v-else class="el-icon-setting"></i>
      </div>
    </div>
    <!--mask-->
    <div v-if="visible != '0'" @click="toggleToolVisible" class="page-mask" style="z-index: 999999998"></div>
  </div>
</template>

<script>
import siteOptions from "@/config/index";
import { getIsTabbedMenu } from "../utils/config";

let isTabbedMenu = getIsTabbedMenu();
let layoutsConfig = {
  layouts: [
    {
      id: "HeaderLeftMainLayout",
      name: "左侧菜单"
    },
    {
      id: "HeaderMainLayout",
      name: "顶部菜单"
    },
    {
      id: "HeaderLeftMenusMainLayout",
      name: "顶部+左侧"
    },
    {
      id: "HeaderTiledMainLayout",
      name: "顶部平铺"
    },
    {
      id: "HeaderLeftSeniorLayout",
      name: "右侧small"
    }
  ],
  default: "HeaderLeftMainLayout"
};

export default {
  data() {
    return {
      visible: this.getDevToolVisible(),
      isLoading: true,
      radDesignerHost: "http://localhost:10000/#/",
      projectRootDir: __PROJECT_ROOT__,
      isUseRadCli: siteOptions["isUseRadCli"],
      siteOptions: {
        theme:
          localStorage.getItem("fav-theme") ||
          siteOptions["theme"] ||
          "default",
        layout: localStorage.getItem("fav-layout") || layoutsConfig["default"],
        isTabbedMenu:
          localStorage.getItem("fav-is-tabbed-menu") ||
          (isTabbedMenu ? "1" : "0")
      }
    };
  },
  computed: {
    radDesignerUrl() {
      return (
        this.radDesignerHost +
        "?root=" +
        window.encodeURIComponent(this.projectRootDir)
      );
    },
    allLayouts() {
      return layoutsConfig["layouts"];
    },
    allThemes() {
      return [
        {
          id: "default",
          name: "默认(深色)"
        },
        {
          id: "green",
          name: "绿色"
        },
        {
          id: 'tint',
          name: '浅色'
        }
      ];
    },
    menuTypes() {
      return [{ id: "0", name: "禁用" }, { id: "1", name: "启用" }];
    },
    themeDisabled(){
      // TODO: HeaderLeftSeniorLayout（成都）布局不支持切换皮肤
      return this.siteOptions.layout === 'HeaderLeftSeniorLayout'
    }
  },
  methods: {
    setDevToolVisible(status) {
      status = status || "0";
      localStorage.setItem("dev-tool-visible", status);
      this.visible = status;
    },
    toggleToolVisible() {
      this.setDevToolVisible(this.visible == "0" ? "1" : "0");
    },
    getDevToolVisible() {
      return localStorage.getItem("dev-tool-visible") || "0";
    },
    /**
     * iframe 加载完成后执行。
     */
    onRadDesignerLoaded() {
      this.isLoading = false;
    },
    changeLayout() {
      localStorage.setItem("fav-layout", this.siteOptions.layout);
      if(this.siteOptions.layout === 'HeaderLeftSeniorLayout'){
        // HeaderLeftSeniorLayout布局必须依赖senior皮肤
        this.siteOptions.theme = 'senior'
        this.changeTheme()
      }else if(this.siteOptions.theme == 'senior'){
        this.siteOptions.theme = 'default'
        this.changeTheme()
      }else{
        this.reloadPage();
      }
    },
    changeTabbed() {
      localStorage.setItem("fav-is-tabbed-menu", this.siteOptions.isTabbedMenu);
      this.reloadPage();
    },
    changeTheme() {
      localStorage.setItem("fav-theme", this.siteOptions.theme);
      this.reloadPage();
    },
    reloadPage() {
      this.$nextTick(() => {
        window.location.reload();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
$devToolWidth: 380px;
$toggleBtnSize: 40px;
.dev-settings {
  position: fixed;
  background-color: #fff;
  width: $devToolWidth;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999999999;
  transition: right 0.3s;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  padding: 10px 10px 10px 20px;
  &.collapsed {
    right: -$devToolWidth;
    box-shadow: none;
  }
  &.rad {
    width: 80%;
    padding: 0;
    &.collapsed {
      right: -80%;
    }
  }
  .toggle-btn {
    position: absolute;
    background: #48c570;
    top: 48%;
    left: -$toggleBtnSize;
    width: $toggleBtnSize;
    height: $toggleBtnSize;
    color: #fff;
    text-align: center;
    line-height: $toggleBtnSize;
    font-size: 26px;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
  }
  .rad-designer-iframe {
    border: none;
  }
}
.layout-icon-wrapper {
  background-color: #fff;
  border: solid 1px #ccc;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 3px;
  overflow: hidden;
  .layout-icon-header,
  .layout-icon-side-left {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .layout-icon-header {
    bottom: auto;
    height: 14px;
    border-bottom: dashed 1px #ccc;
  }
  .layout-icon-side-left {
    right: auto;
    width: 14px;
    border-right: dashed 1px #ccc;
  }
  .menu-part {
    background-color: #eee;
  }
  .layout-top-tint{
    height: 28px;
    border-bottom: dashed 1px #ccc;
    background-color: rgba(238, 238, 238, .38);
  }
  .layout-top-small{
    width: 10px;
  }
  .point{
    position: absolute;
    width: 12px;
    height: 12px;
    background: #f8ce33;
    top: 18px;
    left: 3px;
    border-radius: 50%;
    border: solid 2px #fff;
  }
}
.theme-icon {
  background-color: #fff;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid #eae7e7;
}
.my-radio-group /deep/ {
  .el-radio {
    margin-left: 0 !important;
    margin-right: 15px !important;
    position: relative;
  }
  .el-radio__input {
    position: absolute;
    left: 0;
    bottom: 8px;
  }
  .el-radio__label {
    display: block;
    padding-left: 0 !important;
  }
  .my-radio-label {
    text-indent: 16px;
    line-height: 2.5em;
  }
}

.site-options {
  /deep/ .el-form-item {
    margin-bottom: 35px;
    .el-form-item__label {
      padding-bottom: 0;
      line-height: 3.8em;
      //color: #000;
      &:before {
        content: "\00BB ";
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.el-radio{
  width: 90px;
}
.el-radio.margin{
  margin-bottom: 16px;
}
.theme-msg{
  font-size: 11px;
  color: #888;
}
</style>
