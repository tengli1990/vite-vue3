<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <!-- <SalesProductPie :loading="loading" /> -->
          <m-echarts ref="pieECharts" v-model:options="pieEChartsOptions"></m-echarts>
        </a-card>
      </a-col>
      <!-- <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <SalesProductLine :loading="loading" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <SalesProductPie :loading="loading" />
        </a-card>
      </a-col> -->
    </a-row>
    <!-- <a-row class="mt16" :gutter="16">
      <a-col :span="24">
        <a-card :loading="loading" title="折线图">
          <SalesProductLine :loading="loading" />
        </a-card>
      </a-col>
    </a-row>

    <a-row class="mt16" :gutter="16">
      <a-col :span="24">
        <a-card :loading="loading" title="自定义">
          <CustomEChart :loading="loading" />
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref } from 'vue'
  import pieOptions from './echarts/pieOptions'

  export default defineComponent({
    setup () {
      const loading = ref(true)
      const pieECharts: any = ref()

      const pieEChartsOptions: any = pieOptions
      setTimeout(() => {
        loading.value = false
        nextTick(() => {
          pieEChartsOptions.title = {
            text: '异步加载标题33'
          }
          const { setOptions } = pieECharts.value.useInstance()
          setOptions(
            {
              title: {
                text: 2222
              }
            }
          )
          // console.log('pieOptions', pieOptions);
          // pieEChartsOptions.title = {};
          //  pieEChartsOptions.series = [];
        })
      }, 1500)
      return {
        pieEChartsOptions,
        loading,
        pieECharts
      }
    }
  })
</script>

<style scoped></style>
