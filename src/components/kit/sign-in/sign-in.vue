<template>
  <modal v-if="isShowSignInModal" @close="handleCloseModel">
    <h3 slot="header">登录</h3>
    <div class="sign-in-form" slot="body">
      <input v-model="formData.account" type="text" placeholder="昵称" style="width: 100%" />
      <input v-model="formData.password" type="password" placeholder="密码" style="width: 100%" />
    </div>
    <div slot="footer">
      <Btn theme="primary" long @click="login" :loading="isLoginLoading">确定登录</Btn>
      <Btn long @click="goToRegister" style="margin-top: 10px;">我要注册</Btn>
    </div>
  </modal>
</template>

<script src="./sign-in.js"></script>

<style lang="less" scoped>
.sign-in-form {
  input {
    width: 100%;
    outline: none;
    margin: 5px 0;
    padding: 0 10px;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    background-color: @colorBgBody;
    border: 1px solid transparent;
    border-radius: 5px;
  }

  input:hover {
    background-color: lighten(@colorBgBody, 2%);
  }

  input:focus {
    border-color: @colorInfo;
  }
}
</style>
