<template>
  <div class="m-field">
     <div class="m-field--header">
        <div class="title" >{{title}}</div>
     </div>
     <div class="m-filed--content">
        <slot></slot>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'm-field',
  props: {
    title: String
  },
  setup () {
    return {};
  }
});
</script>
