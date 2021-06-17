<template>
  <div class="sample-system-account">
    <div class="side-menu">
      <ul>
        <li v-for="(item, index) in tabs" :key="index" @click="onTab(item)" :class="{ selected: item.path === $route.path }">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="account-content">
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup () {
      return {
        tabs: [
          {
            path: '/system/account/tab1',
            name: '模块1'
          },
          {
            path: '/system/account/tab2',
            name: '模块2'
          }
        ]
      }
    },
    methods: {
      onTab (item: any) {
        this.$router.push(item.path)
      }
    }
  })
</script>

<style lang="less" scoped>
  .sample-system-account {
    display: flex;
    height: 100%;

    .side-menu {
      width: 200px;
      height: 100%;
      background: #fff;
      padding: 10px 20px;

      li {
        line-height: 30px;
        cursor: pointer;

        &.selected {
          color: red;
        }
      }
    }

    .account-content {
      flex: 1;
      background: #fff;
      margin-left: 20px;
    }
  }
</style>
