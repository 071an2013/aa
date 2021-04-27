<template>
  <div>
    <!-- 
      holder 部分会被提取到主内容区的容器内，始终驻留在 DOM 上，
      以便于保持 iframe 中内容的状态。
    -->
    <div ref="holder" v-show="isShowIFrame" class="iframe-wrapper" :class="$root.siteRenderer">
      <iframe
        v-for="url in allIFrames"
        :key="url"
        :src="url"
        :class="{visible: url === currentIFrame}"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isShowIFrame", "allIFrames", "currentIFrame"]),
    url() {
      return this.$route.query.url;
    }
  },
  mounted() {
    this.showIFrame();
    this.$nextTick(() => {
      // 必须这样实现，才能保证 iframe 内部的状态是驻留的。
      this.$el.parentNode.insertBefore(this.$refs.holder, this.$el);
    });
  },
  activated() {
    this.showIFrame();
  },
  deactivated() {
    this.setIsShowIFrame(false);
  },
  watch: {
    url: {
      handler(val) {
        if (val) {
          this.showIFrame();
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.setIsShowIFrame(false);
    next();
  },
  methods: {
    ...mapActions(["setIsShowIFrame", "pushIFrameUrl"]),
    showIFrame() {
      this.setIsShowIFrame(true);
      this.pushIFrameUrl(this.url);
    }
  }
};
</script>
