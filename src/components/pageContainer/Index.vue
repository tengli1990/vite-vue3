<template>
  <div class="m-page-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'm-page-container',
  setup () {
    return {};
  }
});
</script>

<style scoped>

</style>
