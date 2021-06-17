<template>
  <div class="m-page-header">
    <router-link to="/">首页</router-link>
    <a-page-header :breadcrumb="{ routes, itemRender }" :title="title" :sub-title="subTitle" @back="() => $router.go(-1)">
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
  import { defineComponent, h } from 'vue'
function abc () {
  alert(1)
}
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
      // console.log(11111, routes, 33333);
    },
    methods: {
      itemRender ({ route, params }: any) {
        if (route.path === this.$route.path || route.path === null) {
          return route.breadcrumbName
        }

        return h(
          'a',
          {

            attrs: {
              to: {
              path: route.path || '/',
              params: params
            }
            }
          },
          [route.breadcrumbName]
        )
      }
    }
  })
</script>

<style scoped></style>
