import { App, Component } from 'vue'

import { createFromIconfontCN } from '@ant-design/icons-vue'
import { convertComponentName } from '../utils'
// custom component
import PageHeader from './pageHeader/Index.vue'
import PageContainer from './pageContainer/Index.vue'
import Field from './field/Index.vue'
import FilterItem from './filterItem/Index.vue'
import Layout from './layout/Index.vue'
import Menu from './layout/menu/Menu.vue'
import Icon from './icon/Index.vue'
import Details from './details/Index.vue'

// icon
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2248787_j06912w2li.js'
})
const components: Component[] = [
  PageHeader,
  PageContainer,
  Field,
  FilterItem,
  Details,
  Layout,
  Menu,
  Icon
]

export const registerComponents = (app: App): void => {
  app.component('IconFont', IconFont)
  components.forEach(component => {
    if (component.name) {
      app.component(convertComponentName(component.name, {
        firstUpperCase: true
      }), component)
    }
  })

  app.config.globalProperties.$testFn = (a: any): void => {
    console.log(a)
  }
  // app.mixin({
  //   $testFn: 'Vue'
  // })
}
