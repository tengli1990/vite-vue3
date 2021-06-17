<template>
  <a-dropdown placement="bottomCenter">
    <div class="right-item">
      <TranslationOutlined class="right-item--icon" @click.prevent />
    </div>
    <template #overlay>
      <a-menu @click="onSelect">
        <a-menu-item key="zhCN">
          <a href="javascript:;">简体中文</a>
        </a-menu-item>
        <a-menu-item key="enUS">
          <a href="javascript:;">English</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { TranslationOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'AsLocal',
    components: {
      TranslationOutlined
    },
    data () {
      return {
        localeValue: 'zhCN'
      };
    },
    methods: {
      onSelect ({ key }: any) {
        window.localStorage.setItem('_LANGUAGE', key);
        // this.$store.dispatch('setLocale', key);
        // this.$i18n.locale = key;
      }
    }
  });
</script>

<style lang="less" scoped></style>
