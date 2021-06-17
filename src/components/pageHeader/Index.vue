<template>
  <div class="m-page-header">
    <!-- <router-link to="/">首页</router-link> -->
    <a-breadcrumb class="m-page-header--breadcrumb" :routes="routes">
      <template #itemRender="{ route, params }">
        <span v-if="route.path === $route.path || route.path === null">
          {{ route.breadcrumbName }}
        </span>
        <router-link
          v-else
          :to="{
            path: route.path || '/',
            params: params,
          }"
        >
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
    <a-page-header class="m-page-header--main" :class="initHeaderClass" :title="title" :sub-title="subTitle" @back="() => $router.go(-1)">
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </a-page-header>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'm-page-header',
    props: {
      title: String,
      subTitle: String,
      breadcrumb: [Array, Boolean],
      breadcrumbPush: {
        type: [Array, Object],
        default () {
          return []
        }
      },
      breadcrumbSplice: {
        type: Array,
        default () {
          return []
        }
      }
    },
    setup (props: any) {
      return {
        ...props
      }
    },
    data () {
      const routes: any[] = []
      return {
        routes: routes,
        defaultTitle: this.title || this.$route.meta.title
      }
    },
    computed: {
      initHeaderClass () {
        return {
          'no-footer': true
        }
      }
    },
    created () {
      if (!this.breadcrumb) {
        // .filter(route => route.meta.title !== '首页')
        this.routes = this.$route.matched.concat().map(function (route) {
          return {
            path: route.path,
            breadcrumbName: route.meta.title
          }
        })
        this.routes.push(...this.breadcrumbPush)

        if (this.breadcrumbSplice.length) {
          // this.routes.splice(...this.breadcrumbSplice);
        }
      }
    },
    methods: {}
  })
</script>

<style lang="less" scoped>
  .m-page-header {
    padding: 16px 24px;

    &--main {
      padding: 0;

      &.no-footer {
        &:deep(.ant-page-header-footer) {
          display: none;
        }
      }
    }

    &--breadcrumb {
      margin-bottom: 8px;
    }
  }
</style>
