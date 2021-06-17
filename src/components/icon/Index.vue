<template>
  <icon-font class="as-icon" :type="typeName" :style="initStyle" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AsIcon',
    props: {
      type: {
        type: String,
        required: true
      },
      size: {
        type: [String, Number],
        default: 'default' // small | mini
      },
      right: {
        type: [Number, String],
        default: 8
      },
      left: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        sizeConfig: {
          default: 16,
          small: 14,
          mini: 12
        }
      };
    },
    computed: {
      typeName (): string {
        return `icon-as-${this.type}`;
      },
      initStyle (): any {
        // const size: any = this.size;
        // enum SizeConfig {
        //   'default' = 16,
        //   'small' = 14,
        //   'mini' = 12,
        // }
        return {
          // fontSize: (SizeConfig[size] || size) + 'px',
          marginLeft: this.left + 'px',
          marginRight: this.right + 'px',
          fontSize: '1em'
        };
      }
    }
  });
</script>
