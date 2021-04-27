<template>
  <div class="exception-message-wrapper">
    <div class="exception-img">
      <!--异常信息图示-->
      <slot name="image"></slot>
    </div>
    <div class="exception-message">
      <h3 class="title">{{title}}</h3>
      <div class="description">
        <slot></slot>
        <div>
          您可以返回
          <a href="/">首页</a>
          继续浏览
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>