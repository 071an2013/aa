import siteOptions from '@/config/index'

/**
 * 水印渲染
 */
export function renderWatermark(callback) {
  if (siteOptions['isShowWatermark'] === true) {
    siteOptions['getWatermarkInfo']().then(user => {
      if (user['name'] && user['id']) {
        callback(user)
        let watermarkRenderer = () => {
          let oldWatermark = document.querySelectorAll('body>.watermark')
          oldWatermark.forEach(node => document.body.removeChild(node))
          const $watermarkDom = document.createElement('div')
          $watermarkDom.style.cssText = [
            'position: fixed',
            'left: 0px',
            'right: 0px',
            'top: 0px',
            'bottom: 0px',
            'z-index: 2147483647',
            'pointer-events: none'
          ].join(';')
          const $watermarkWrapperDom = document.createElement('div')
          $watermarkWrapperDom.classList.add('watermark')
          $watermarkWrapperDom.appendChild($watermarkDom)
          document.body.appendChild($watermarkWrapperDom)
          window.setTimeout(() => {
            const watermarkStr = user['name'] + '-' + user['id']
            window['__punch'] && __punch.to($watermarkDom, watermarkStr, {
              width: 250,	//水印单元宽度
              height: 80,	//水印单元高度
              bg: 'transparent',	//水印背景
              bgAlpha: 0,		//水印背景透明度
              color: '#AAA',	//水印字体颜色
              alpha: 0.20,	//水印字体颜色透明度
              font: '14px Arial'	//水印字体
            })
            // 防止用户改变水印的css样式。
            let observer = new MutationObserver(function () {
              observer = null
              watermarkRenderer()
            });
            observer.observe($watermarkWrapperDom, {
              attributes: true,
              childList: true,
              subtree: true
            });
          }, 0)
        }
        watermarkRenderer()
        window.setInterval(() => {
          // 防止用户手动删除水印外层 div.
          let oldWatermark = document.querySelectorAll('body>.watermark')
          if (!oldWatermark.length) {
            watermarkRenderer()
          }
        }, 1000)
      } else {
        throw new Error({
          error: '未获取到水印所需要的用户信息!',
          code: 1002
        })
      }
    })
  }
}