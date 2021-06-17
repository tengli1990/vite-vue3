<template>
  <div>
    <a-button type="primary" @click="enter" class="mr-2">Enter Window Full Screen</a-button>
    <a-button color="success" @click="toggle" class="mr-2">Toggle Window Full Screen</a-button>

    <a-button color="error" @click="exit" class="mr-2">Exit Window Full Screen</a-button>

    Current State: {{ isFullscreen }}

    <div ref="domRef" style="background: #fff;">
      <a-button type="primary" @click="toggleDom" class="mr-2">Exit Dom Full Screen</a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { useFullscreen } from '@vueuse/core'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup () {
      const domRef = ref(null)
      const { enter, toggle, exit, isFullscreen } = useFullscreen()

      const { toggle: toggleDom } = useFullscreen(domRef)
      return {
        enter,
        toggleDom,
        toggle,
        isFullscreen,
        exit,
        domRef
      }
    }
  })
</script>

<style scoped></style>
