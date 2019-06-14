<template>
  <modal v-if="isShowSignUpModal" @close="handleCloseModel">
    <h3 slot="header">注册</h3>
    <div class="sign-up-form" slot="body">
      <input v-model="formData.userName" type="text" placeholder="昵称" />
      <input v-model="formData.phone" type="text" placeholder="手机号" />
      <input v-model="formData.email" type="text" placeholder="邮箱" />
      <input v-model="formData.password" type="password" placeholder="密码" />
      <input v-model="formData.confirmPassword" type="password" placeholder="确认密码" />
    </div>
    <div slot="footer">
      <Btn theme="success" long @click="singUp" :loading="isSignUpLoading">确定注册</Btn>
      <Btn theme="primary" long @click="goToLogIn" style="margin-top: 10px;">直接登录</Btn>
    </div>
  </modal>
</template>

<script src="./sign-up.js"></script>

<style lang="less" scoped>
.sign-up-form {
  input {
    width: 100%;
    outline: none;
    margin: 5px 0;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    background-color: @colorBg;
    border: 1px solid transparent;
    border-radius: 5px;
  }

  input:hover {
    background-color: lighten(@colorBg, 2%);
  }

  input:focus {
    border-color: @colorInfo;
  }
}
</style>
