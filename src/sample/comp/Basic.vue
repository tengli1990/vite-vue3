<template>
  <div>
     <MPageHeader title="基础组件">

    </MPageHeader>
    <MPageContainer no-fill>
      <MField title="组件-PageHeader">
        <m-page-header title="组件详情" sub-title="副标题">
          <template #extra>
            <a-button type="default" @click="refresh">
              <SyncOutlined solt="icon" />
            </a-button>
            <a-button key="3">按钮3</a-button>
            <a-button key="2">按钮2</a-button>
            <a-button key="1" type="primary">按钮1</a-button>
          </template>
        </m-page-header>
      </MField>

      <MField class="mt-8" title="组件-Details">
        <m-details column="2" :label-width="100" width="99%" v-model:config="detailConfig" v-model="detailData">
          <template v-slot:custom="{ text, record }">
            <!-- {{text}} -->
            <a class="mr-8" href="">{{ record.value }}</a>
            <a-tag v-if="text">{{ text }}</a-tag>
            <a-tag v-if="text" color="red">{{ text }}</a-tag>
          </template>
        </m-details>
      </MField>

      <MField class="mt-8" title="组件-Filter">
        <m-filter-item :formData="formData" :formConfig="formConfig" :btnConfig="btnConfig" @btnClick="btnClick"></m-filter-item>
      </MField>
    </MPageContainer>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { SyncOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    components: {
      SyncOutlined
    },
    data () {
      return {
        detailData: {},
        detailConfig: {
          'name.label': {
            label: '姓名',
            customRender: (val: any): any => {
              return val && val + 1111
            },
            unit: '㊙️',
            width: '300px'
          },
          count: {
            label: '数量数量',
            unit: '个'
          },
          type: {
            label: '类型类型',
            width: '300px'
          },
          custom: {
            label: '自定义',
            row: 2
          }
        },
        formData: {},
        formConfig: [
          {
            type: 'input',
            label: '输入框',
            placeholder: '请输入',
            bindKey: 'inputField'
          }
        ],
        btnConfig: [
          {
            clickType: 'search',
            type: 'primary',
            name: '查询'
          },
          {
            clickType: 'reset',
            type: 'primary',
            name: '重置'
          }
        ]
      }
    },
    created () {
      setTimeout(() => {
        console.log('start')
        this.detailData = {
          name: {
            label: '是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉'
          },
          count: 100,
          type: '组合',
          custom: '自定义的值'
        }
      }, 3000)
    },
    methods: {
      btnClick ({ type, params }: any) {
        console.log(type, params)
      }
    }
  })
</script>

<style scoped></style>
