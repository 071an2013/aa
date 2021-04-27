<template>
  <span class="rad-badge rad-badge-status">
    <span class="rad-badge-status-dot" :class="activeClassName"></span>
    <span class="rad-badge-status-text" v-if="text">
      {{ text }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'default'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    activeClassName () {
      return `rad-badge-status-${this.status}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes radStatusProcessing {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.4);
      opacity: 0;
    }
  }

  .rad-badge-status {
    display: inline-block;
    line-height: inherit;
    position: relative;
    .rad-badge-status-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      vertical-align: middle;
      position: relative;
      top: -1px;
      &.rad-badge-status-success {
        background-color: #52c41a;
      }
      &.rad-badge-status-error {
        background-color: #f5222d;
      }
      &.rad-badge-status-default {
        background-color: #d9d9d9;
      }
      &.rad-badge-status-processing {
        background-color: #1890ff;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #1890ff;
          position: absolute;
          top: 0;
          left: 0;
          animation: radStatusProcessing 1.2s infinite ease-in-out
        }
      }
      &.rad-badge-status-warning {
        background-color: #faad14;
      }
    }
    .rad-badge-status-text {
      margin-left: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
</style>
