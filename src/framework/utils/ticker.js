import siteOptions from '@/config/index'

/**
 * 初始化埋点。
 */
export function enableTracker() {
  mxticker.init(siteOptions['trackerOptions'])
}
