<template>
  <div class="right-item">
    <SettingOutlined class="right-item--icon" @click="showDrawer" />
    <a-drawer width="400" :title="title" :placement="placement" :closable="false" :visible="visible" @close="onClose">
      <ul class="text-list">
        <h3>界面功能</h3>
        <li>
          颜色模式
          <a-radio-group name="radioGroup" v-model:value="theme.value" @change="updateTheme()">
            <a-radio value="light">白色模式</a-radio>
            <a-radio value="dark">暗黑模式</a-radio>
          </a-radio-group>
        </li>
        <li>
          <div class="content">
            <!-- {{ siderWidth }} -->
            菜单宽 <a-input v-model:value="siderWidth.value" placeholder="Basic usage" />
          </div>
        </li>
      </ul>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, UnwrapRef } from 'vue'
  import { SettingOutlined } from '@ant-design/icons-vue'
  import { useStore } from '../../../store/'

  export default defineComponent({
    name: 'AsSettings',
    components: {
      SettingOutlined
    },
    setup () {
      const { appStore } = useStore()
      const siderWidth: UnwrapRef<any> = reactive({
        value: appStore.getSiderWidth
      })
      const theme: UnwrapRef<any> = reactive({
        value: appStore.getTheme
      })
      return {
        theme,
        siderWidth,
        appStore
      }
    },
    data () {
      return {
        title: '项目配置',
        visible: false,
        placement: 'right',
        checked: false,
        timer: null
      }
    },
    watch: {
      siderWidth: {
        handler (newVal, oldVal) {
          let ret = 150
          if (newVal.value > 150) {
            ret = newVal.value
          }
          console.log(newVal, oldVal)
          this.appStore.setSiderWidth(Number(ret))
        },
        deep: true
      }
    },
    methods: {
      onClose () {
        this.visible = false
      },
      showDrawer () {
        this.visible = true
      },
      updateTheme () {
        alert('update')
        this.appStore.setTheme(this.theme.value)
      }
    }
  })
</script>

<style scoped></style>
