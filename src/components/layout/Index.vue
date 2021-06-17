<template>
  <a-layout class="basic-layout">
    <a-layout-sider class="basic-layout--sider" v-model:width="getSiderWidth" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <AsLogo />
      <!-- menu -->
      <div class="sider-menu">
        <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
          <m-menu v-for="route in menus" :key="route.path" :item="route" @titleClick="titleClick"></m-menu>
        </a-menu>
      </div>
      <!-- menu end -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="basic-layout--header">
        <div class="collapsed-btn">
          <MenuUnfoldOutlined v-if="collapsed" @click="toggleCollapsed()" />
          <MenuFoldOutlined v-else @click="toggleCollapsed()" />
        </div>
        <div class="right-box">
          <AsNotice />
          <AsLocal />
          <AsAvatar />
          <AsSettings />
        </div>
      </a-layout-header>
      <!-- <AsTab /> -->
      <a-layout-content class="basic-layout--content">
        <a-config-provider>
          <router-view v-slot="{ Component }">
            <transition name="fade-slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </a-config-provider>
      </a-layout-content>
      <a-layout-footer class="basic-layout--footer">
        <slot name="footer"></slot>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import AsLogo from './logo/Logo.vue'
  import AsAvatar from './avatar/Index.vue'
  import AsLocal from './locale/Index.vue'
  import AsNotice from './notice/Index.vue'
  // import AsTab from "./tabs/Index.vue";
  import AsSettings from './settings/Index.vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { useStore } from '../../store/'
  export default defineComponent({
    name: 'm-layour',
    components: {
      [AsAvatar.name]: AsAvatar,
      [AsLogo.name]: AsLogo,
      [AsLocal.name]: AsLocal,
      [AsNotice.name]: AsNotice,
      // [AsTab.name]: AsTab,
      [AsSettings.name]: AsSettings,
      MenuFoldOutlined,
      MenuUnfoldOutlined
    },
    setup () {
      const { appStore } = useStore()
      const getSiderWidth = computed(() => {
        return appStore.siderWidth
      })
      return {
        getSiderWidth
      }
    },
    data () {
      const { routesStore } = useStore()
      const selectedKeys: string[] = []
      const openKeys: string[] = []

      return {
        selectedKeys: selectedKeys,
        openKeys: openKeys,
        closeKeys: [],
        collapsed: false,
        menus: routesStore.getRoutes
      }
    },
    watch: {
      $route: {
        handler (route) {
          this.openKeys = []
          this.resetRouteKeys(route)
        },
        immediate: true
      }
    },
    mounted () {
      // console.log(112313123132, toRaw(this.$store.getters.locale));
    },
    methods: {
      toggleCollapsed () {
        this.collapsed = !this.collapsed
        document.body.classList.toggle('collapsed')
        if (this.collapsed) {
          this.$nextTick(() => {
            this.openKeys = []
          })
        } else {
          this.resetRouteKeys(this.$route)
        }
      },
      // menu菜单展开收缩的切换模式
      titleClick ({ key }: any) {
        this.$nextTick(() => {
          const isOpen = this.openKeys.includes(key)
          if (!isOpen) return
          const newOpenKeys: string[] = []
          this.openKeys.forEach((k: string) => {
            if (key.includes(k)) {
              newOpenKeys.push(k)
            }
          })
          this.openKeys = newOpenKeys
        })
      },
      resetRouteKeys ({ path, matched }: any) {
        matched.forEach((route: any) => {
          if (route.redirect) {
            if (route.children.length > 1) {
              this.selectedKeys = [path]
            } else {
              this.selectedKeys = [route.path]
            }
            this.openKeys.push(route.path)
          }
        })
      }
    }
  })
</script>

<style lang="less" scoped></style>
