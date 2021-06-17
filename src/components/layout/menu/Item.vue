<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <icon-font v-if="routeChildren.meta.icon" :type="routeChildren.meta.icon"></icon-font>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script lang="ts">
  import { isExternal } from '@/utils/validate';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'm-menu-item',
    setup () {
      return {};
    },
    props: {
      item: {
        type: Object,
        default () {
          return null;
        }
      },
      routeChildren: {
        type: Object,
        default: () => null
      }
    },
    computed: {},
    methods: {
      handleLink () {
        const routePath = this.routeChildren.fullPath;
        const target = this.routeChildren.meta.target;
        if (target === '_blank') {
          if (isExternal(routePath)) {
            window.open(routePath);
          } else if (this.$route.path !== routePath) {
            window.open(routePath.href);
          }
        } else {
          if (isExternal(routePath)) {
            window.location.href = routePath;
          } else if (this.$route.path !== routePath) {
            this.$router.push(routePath);
          }
        }
      }
    }
  });
</script>

<style scoped>
  .item-menu {
    color: #fff;
  }
</style>
