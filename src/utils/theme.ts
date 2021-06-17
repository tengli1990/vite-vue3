import dark from '@/assets/style/global.dark.less'
import light from '@/assets/style/global.less'
import { useStore } from '@/store'

function addSkin (content: string) {
  const head = document.getElementsByTagName('head')[0]
  const getStyle = head.getElementsByTagName('style')
  console.log(getStyle)
  // 查找style是否存在，存在的话需要删除dom
  if (getStyle.length > 0) {
    for (let i = 0, l = getStyle.length; i < l; i++) {
      if (getStyle[i]?.getAttribute('data-type') === 'theme') {
        getStyle[i].remove()
      }
    }
  }
  // 最后加入对应的主题和加载less的js文件
  const styleDom = document.createElement('style')
  styleDom.dataset.type = 'theme'
  styleDom.innerHTML = content
  head.appendChild(styleDom)
}

// 调用方法
export function useTheme (theme: string) {
  document.getElementById('htmlRoot')?.setAttribute('data-theme', theme)
  switch (theme) {
    case 'dark':
      addSkin(dark)
      break
    default:
      addSkin(light)
      break
  }
}

export function setupTheme () {
  const { appStore } = useStore()
  appStore.setTheme(appStore.theme)
}
