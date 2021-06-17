<template>
  <div class="sample-index">
    <MPageHeader title="基础布局">

    </MPageHeader>
    <MPageContainer>
      <div>1</div>
       {{$moment()}}
       <div class="mt-24">2</div>
    </MPageContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

  export default defineComponent({
    setup () {
    const { proxy }: any = getCurrentInstance()
    proxy.$testFn(1)
      return {
      }
    },
    data () {
      return {
        moment: this.$moment()
      }
    },
    created () {
      console.log(this.$testFn)
    }
  })
</script>

<style scoped></style>
