<template>
  <div class="home">

   <!-- {{$t().message.test}} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Aboute from './About.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Aboute
  },
  created () {
    // console.log(11111, this.$t('test'));
  }
})
</script>

<style lang="less">
.home {
  // background-color:red;
  width: 100%;
  height: 50%;
}
</style>
