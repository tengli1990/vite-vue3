<template>
  <div>
    <a-alert message="根据后台接口文件流下载" />
    <a-button type="primary" class="my-4" @click="handleDownByData">文件流下载</a-button>

    <a-alert message="图片Url下载,如果有跨域问题，需要处理图片跨域" />
    <a-button type="primary" class="my-4" @click="handleDownloadByOnlineUrl">
      图片Url下载
    </a-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import { downloadByData, downloadByOnlineUrl } from '@/utils/download'

  export default defineComponent({
    setup () {
      function handleDownByData () {
        downloadByData('text content', 'test.xlsx')
      }

      function handleDownloadByOnlineUrl () {
        downloadByOnlineUrl(
          'http://39.106.87.73:25010/nebula/me/file/get?filePath=/equipment-photo/c6d066fc-ac94-4e6b-88ae-8ee27bc0a9d1/equipment/photo/71333dd9-6db2-451c-89c0-f84662579987.png&fileName=1623035759353',
          '1623035759353.png'
        )
      }
      return {
        handleDownByData,
        handleDownloadByOnlineUrl
      }
    }
  })
</script>

<style scoped></style>
