<template>
  <div class="card-panel" @click="onClick">
    <div class="card-panel-icon-wrapper" :style="iconWrapperStyles">
      <slot name="icon"></slot>
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">{{title}}</div>
      <slot name="number"></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    title: String,
    IconColor: String
  },
  data() {
    return {
      isHover: false
    };
  },
  mounted() {
    this.$el.addEventListener("mouseenter", () => {
      this.isHover = true;
    });
    this.$el.addEventListener("mouseleave", () => {
      this.isHover = false;
    });
  },
  computed: {
    iconWrapperStyles() {
      return this.isHover
        ? {
            background: this.IconColor,
            color: "#FFF"
          }
        : {
            color: this.IconColor
          };
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>


<style lang="scss" scoped>
.card-panel {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  .card-panel-icon-wrapper {
    float: left;
    margin: 8px 0 0 8px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
    > i {
      font-size: 50px;
    }
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
    text-align: right;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
</style>
