<template>
  <div class="sample-json-tree">
    <MPageHeader title="数据操作"></MPageHeader>
    <MPageContainer>
      <vue-json-pretty path="res" :data="data"></vue-json-pretty>

      <m-field title="json编辑器">
        <div id="jsoneditor" style="width: 100%;"></div>
      </m-field>
    </MPageContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import VueJsonPretty from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  import JSONEditor from 'jsoneditor'
  import 'jsoneditor/dist/jsoneditor.min.css'

  export default defineComponent({
    components: { VueJsonPretty },
    setup () {
      console.log(JSONEditor)
      // 'tree' | 'view' | 'form' | 'code' | 'text' | 'preview'
      onMounted(() => {
        const container: any = document.getElementById('jsoneditor')
        const editor = new JSONEditor(
          container,
          {
            search: false,
            // theme: 'bootstrap2',
            mode: 'code',
            mainMenuBar: false,
            navigationBar: true,
            indentation: 2,
            history: false,
            colorPicker: true
          },
          {
            Array: [1, 2, 3],
            Boolean: true,
            Null: null,
            Number: 123,
            Object: { a: 'b', c: 'd' },
            String: 'Hello World'
          }
        )
      })
      return {
        data: {
          code: '0000',
          msg: 'xxx',
          data: { key: 'value' }
        }
      }
    },
    methods: {
      handleClick (a: any) {
        console.log(a)
      }
    }
  })
</script>

<style scoped></style>
