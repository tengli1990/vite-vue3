<template>
  <div class="right-item">
    <BellOutlined class="right-item--icon" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BellOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: { BellOutlined },
    name: 'AsNotice',
    setup () {
      return {};
    }
  });
</script>

<style scoped></style>
