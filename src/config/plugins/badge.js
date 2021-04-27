export default {
  /**
   * 全局性的默认 badge 配置。
   * 具体配置与示例，请参考 element-ui badge 组件文档。
   */
  defaultBadge: {
    /**
     * 菜单消息提醒最大值，超过最大值会显示 {max}+ 。
     * 要注意的是只有菜单消息是数字才生效。
     */
    'max': 99,
    /**
     * 是否仅显示一个小红点。
     */
    'is-dot': false,
    /**
     * badge 类型，决定了其外观样式。
     * 可选值有：primary|success|warning|danger|info
     */
    'type': 'danger'
  }
}