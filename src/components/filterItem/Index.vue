<template>
  <div class="m-filter-item">
    formState:{{ formState }}
    <br />
    result: {{ result }}
    <a-form ref="formRef" layout="inline" :model="formState">
      <a-form-item v-for="(item, index) in formConfig" :key="`filter-${index}`" :prop="item.bindKey">
        <template v-slot:label>
          <span v-html="item.label"></span>
        </template>
        <a-input v-if="item.type === 'input'" v-model:value="formState[item.bindKey]" allowClear />
      </a-form-item>

      <a-form-item class="condition-query-buttons">
        <a-space size="middle">
          <a-button v-for="(item, index) in btnConfig" :style="item.style || {}" :key="`button-${index}`" :type="item.type" v-show="defaultTrue(item.show)" @click="btnClick(item.clickType)">
            {{ item.name }}
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef, watch } from 'vue';

  export default defineComponent({
    name: 'm-filter-item',
    props: {
      formData: {
        type: Object,
        default () {
          return {};
        }
      },
      formConfig: {
        type: Array,
        default () {
          return [];
        }
      },
      btnConfig: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    setup (props: any, ctx: any) {
      const $emit = ctx.emit;
      const formRef = ref();
      const formState: UnwrapRef<any> = reactive(JSON.parse(JSON.stringify(props.formData)));
      const formConfig: any = props.formConfig;
      let result: any;

      /** @name watch */
      watch(
        () => props.formData,
        () => {
          console.log();
        },
        { deep: true }
      );

      /** @name computed */

      /** @name methods */
      // 查询时注入处理结果的函数并获取相应的结果
      const injectCustomValueRule = (type: string, key: string, value: any) => {
        let ret:any;
        formConfig.forEach((item: any) => {
          console.log(item.bindKey, 'key', key);
          if (item.bindKey === key && item.customRender) {
            ret = item.customRender(value);
          }
          // reset操作，清空defaultOptions的选项
          if (type === 'reset' && item.defaultOptions) {
            item.defaultOptions = [];
          }
        });
        return ret;
      };
      const interceptResult = () => {
        const ret = JSON.parse(JSON.stringify(formState));
        return ret;
      };
      const defaultTrue = (bool: any): boolean => {
        return bool !== false;
      };
      const reset = () => {
        formRef.value.resetFields();
      };
      const btnClick = (type: string, watch = false): void => {
        const params: any = {};
        if (type === 'reset') {
          reset();
        }
        formConfig.forEach((item: any) => {
          result = interceptResult();
          const key = item.bindKey;
          const value = result[key] === undefined ? '' : result[key];
          // 判断是否注入了自定义函数
          const customValue: any = injectCustomValueRule(type, key, value);
          if (typeof customValue === 'function') {
            customValue({ key, value, params });
          } else if (customValue === null) {
            // 返回值为null 此字段不会添加到返回结果中
          } else if (customValue !== undefined) {
            params[key] = customValue;
          } else {
            params[key] = value;
          }
        });

        if (watch) {
          $emit('change', { type, params });
        } else {
          $emit('btnClick', { type, params });
        }
      };

      return {
        ...props,
        formConfig,
        formState,
        formRef,
        result,
        copyWatching: true,
        btnClick,
        defaultTrue
      };
    }
  });
</script>

<style scoped></style>
