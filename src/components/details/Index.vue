<template>
  <div class="m-details" :style="initStyle">
    <div class="m-details--content" :class="initContentClass">
      <template v-for="(item, index) in itemOptions" :key="index">
        <div class="item" v-if="!item.hidden" :style="{width:item.width}">
          <div class="label" :style="initLabelClass">{{ item.label }}：</div>
          <div class="value" :class="`clamp-${item.row || 1}`">
            <slot :name="item.key" :text="item.value" :record="{ ...item.data, value: item.value }">
              <a v-if="item.click" @click="item.click({ ...modelValue, value: item.value }, $event)">
                {{ item.defaultvalue || item.value }}
              </a>
              <template v-else>{{ item.defaultvalue || item.value }}</template>
            </slot>
          </div>
        </div>
      </template>
    </div>
    <div class="m-details--footer"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'm-details',
    props: {
      modelValue: String,
      config: Object,
      column: {
        type: [Number, String],
        default: 1
      },
      width: {
        type: String,
        default: '100%'
      },
      labelWidth: {
        type: [String, Number],
        default: ''
      }
    },
    emits: ['update:modelValue', 'update:config'],
    computed: {
      initStyle (): any {
        return {
          width: this.width
        };
      },
      initContentClass (): any {
        console.log({
          ['column-' + this.column]: this.column
        });
        return {
          ['column-' + this.column]: this.column
        };
      },
      initLabelClass (): any {
        let w: number | string = this.labelWidth;
        if (typeof w === 'number') {
          w = w + 'px';
        }
        return { width: w };
      },
      itemOptions (): any {
        if (this.modelValue === null && Object.keys(this.modelValue).length > 0) {
          return [];
        }

        return this.dataTransform(this.config, this.modelValue);
      }
    },
    watch: {
      modelValue: {
        handler (newVal) {
          console.log(newVal);
          this.dataTransform(this.config, newVal);
        },
        deep: true
      },
      config: {
        handler (newVal) {
          this.$emit('update:config', newVal);
          if (this.modelValue !== null) {
            return;
          }
          if (Object.keys(this.modelValue).length === 0) {
            return;
          }
          this.dataTransform(newVal, this.modelValue);
        },
        deep: true
      }
    },
    methods: {
      dataTransform (fields: any, data: any) {
        return Object.keys(fields).map((item: string) => {
          let value: any;
          if (item.includes('.')) {
            // 处理多级对象属性
            let childObj = { ...data };
            item.split('.').forEach((attr: any) => {
              if (childObj[attr] || [0, false].includes(childObj[attr])) {
                childObj = childObj[attr];
                value = childObj;
              } else {
                value = undefined;
              }
            });
          } else {
            console.log(data);
            value = data[item];
          }
          let { defaultvalue, click, hidden } = fields[item];
          const { type, label, customRender, appendFields = [], row = 1, width, unit, span = 1, options, show, fieldNames = { name: 'name', value: 'value' } } = fields[item];
          // 处理组合字段
          appendFields.forEach((field: string) => {
            if (data[field] || [0, false].includes(data[field])) {
              value += data[field];
            }
          });
          // 自动匹配options
          // eslint-disable-next-line eqeqeq
          if ((value || [0, false].includes(value)) && options && options.length) {
            const attrName = fieldNames.name;
            const attrvalue = fieldNames.value;
            options.forEach((item: any) => {
              if (item[attrvalue] === value) {
                value = item[attrName];
              }
            });
          }

          // 单位
          if (value && unit) {
            value += unit;
          }

          // 删除可点击按钮
          const removeClick = () => {
            click = null;
          };
          // 处理数据返回值 defaultvalue 和 value 哪个存在优先处理哪个
          if (typeof customRender === 'function') {
            if (defaultvalue) {
              defaultvalue = customRender(value, removeClick, data) || defaultvalue;
            } else {
              value = customRender(value, { ...data, removeClick });
            }
          }
          // eslint-disable-next-line eqeqeq
          if (value == undefined) {
            // value = '--'; // this.$config.tableEmpty;
          }

          if (show && Object.prototype.toString.call(show) === '[object Object]') {
            hidden = true;
            Object.keys(show).forEach((key) => {
              if (key.includes('.')) {
                let row = data;
                key.split('.').forEach((ele) => {
                  if (row[ele]) {
                    row = row[ele];
                  }
                });
                console.log(row);
                if (show[key].includes(row)) {
                  hidden = false;
                }
              } else {
                if (show[key].includes(data[key])) {
                  hidden = false;
                }
              }
            });
          }
          return {
            hidden,
            key: item,
            span,
            defaultvalue,
            click,
            type,
            label,
            value,
            data,
            row,
            width
          };
        });
      }
    }
  });
</script>

<style scoped></style>
