<template>
  <div class="user-login login-bg">
    <section class="user-login--content">
      <div class="left">
        <img class="login-box-bg" src="~@/assets/svg/login-box-bg.svg" alt="" />
        <h3>xxxxx中后台管理系统</h3>
      </div>
      <div class="right">
        <a-form class="form" ref="formRef" :model="formState" :rules="rules" v-bind="layout">
          <h3 class="form-title">登录</h3>
          <a-form-item class="form-item" has-feedback name="username">
            <a-input class="input" v-model:value="formState.username" type="text" @keyup.enter="onSubmit()" placeholder="请输入用户名" autocomplete="off" allow-clear />
          </a-form-item>
          <a-form-item class="form-item" has-feedback name="password">
            <a-input class="input" v-model:value="formState.password" type="password" @keyup.enter="onSubmit()" placeholder="请输入登录密码" autocomplete="off" allow-clear />
          </a-form-item>
          <!--        <a class="forget-password">忘记密码?</a>-->
          <a-button class="login-button mt-24" type="primary" size="large" block @click="onSubmit()">登录</a-button>
        </a-form>
      </div>
    </section>
    <!-- <section class="user-login--footer">
      ©2020-2021 湃方科技（天津）有限责任公司(Pi2Star Technology Ltd.) 版权所有
      <a class="record-number" target="_blank" href="https://beian.miit.gov.cn/">津ICP备19001173号-6</a>
    </section> -->
  </div>
</template>

<script lang="ts">
  import { message } from 'ant-design-vue'
  import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from '../../store'

  interface FormState {
    username: string;
    password: string;
  }

  export default defineComponent({
    setup () {
      const formRef = ref()
      const $route = useRoute()
      const $router = useRouter()
      const { userStore } = useStore()

      const redirect: any = decodeURIComponent(($route.query.redirect as any) || '/welcome')

      const formState: UnwrapRef<FormState> = reactive({
        username: 'service_manager@pi2star.com',
        password: '123qwe'
      })

      console.log(import.meta.env)

      const rules = {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }

      const layout = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 }
      }

      const resetForm = () => {
        formRef.value.resetFields()
      }

      const onSubmit = () => {
        console.log(this)
        console.log(formRef)
        formRef.value.validate().then(() => {
          console.log('values', formState, toRaw(formState))
          userStore.handleLogin(toRaw(formState)).then((res: any) => {
            console.log(res)
            if (res.code !== '0000') {
              message.error(res.msg)
              return
            }
            console.log('登录成功', typeof redirect)
            $router.replace(redirect || 'welcome')
          })
        })
      }
      return {
        redirect,
        formRef,
        formState,
        rules,
        layout,
        resetForm,
        onSubmit,
        svg: import('@/assets/svg/login-bg.svg')
      }
    },
    mounted () {
      // this.$testFn('hahah');
    }
  })
</script>

<style lang="less" scoped>
  .user-login {
    height: 100%;
    display: flex;
    flex-direction: column;

    &--content {
      position: relative;
      width: 90%;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      align-content: center;

      .left {
        flex: 1;
        text-align: center;

        .login-box-bg {
          width: 50%;
          max-width: 600px;
        }

        h3 {
          font-size: 38px;
          font-weight: bold;
          color: #fff;
          margin-top: 30px;
        }
      }

      .right {
        flex: 1;

        .form {
          // background: rgba(255, 255, 255, 0.8);
          width: 400px;
          margin: 0 auto;
          // height: 500px;
          &-title {
            font-size: 20px;
            font-weight: bold;
          }

          .form-item input {
            width: 100%;
          }

          padding-bottom: 50px;
        }
      }
    }

    &--footer {
      text-align: center;
      padding: 24px 50px;
      font-size: 12px;

      &.record-number {
        color: rgba(255, 255, 255, 0.75);

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .login-bg {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(@/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      content: '';
    }
  }

  html[data-theme='dark'] {
    .login-bg {
      background: #293146;

      &::before {
        background-image: url(@/assets/svg/login-bg-dark.svg);
      }
    }
  }
</style>
