<template>
  <div>
    <el-select
      v-model="keyword"
      filterable
      placeholder="搜索菜单"
      size="small"
      width="150px"
      :filter-method="onFilter"
      @change="onChange"
    >
      <el-option v-for="(item, index) in menuList" :key="index" :value="item.path">
        <i :class="item.icon"></i>
        {{item.name}}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import siteOptions from "@/config/index";
export default {
  name: "MenuSearchBox",
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    ...mapGetters(["mainMenuConfig"]),
    menuList() {
      let list = [];
      let walkTreeNodes = (nodes, parentPath) => {
        nodes.forEach(node => {
          if (node["children"] && node["children"].length) {
            walkTreeNodes(node["children"], parentPath + node["path"]);
          } else {
            let menuPath;
            if (
              node["path"].indexOf("http") === 0 ||
              siteOptions["isUseMenuLeafPath"]
            ) {
              menuPath = node["path"];
            } else {
              menuPath = parentPath + node["path"];
            }
            list.push({
              icon: node["icon"],
              name: node["name"],
              path: menuPath
            });
          }
        });
      };
      walkTreeNodes(this.mainMenuConfig, "");
      return list.filter(item => {
        return (
          item.name.indexOf(this.keyword) > -1 ||
          item.path.indexOf(this.keyword) > -1
        );
      });
    }
  },
  methods: {
    onFilter(keyword) {
      this.keyword = keyword;
    },
    onChange(path) {
      if (path.indexOf("http") === 0) {
        // 外链的情况
        window.open(path);
      } else {
        this.$router.push({ path });
      }
      this.keyword = "";
    }
  }
};
</script>