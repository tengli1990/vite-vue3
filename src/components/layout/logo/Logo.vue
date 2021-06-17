<template>
  <div class="layout-logo">
    <img class="layout-logo--img" :src="logo" />
    <span class="layout-logo--text">vue3.x admin</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logo from '@/assets/logo.png';
export default defineComponent({
  name: "AsLogo",
  setup() {
    return {
      logo:logo
    };
  },
});
</script>

<style lang="less" scoped>
.layout-logo {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 40px;
  margin: 12px 20px;
  overflow: hidden;
  overflow: hidden;
  font-size: 15px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;

  &--img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  &--text {
    font-size: 20px;
  }
}
</style>
