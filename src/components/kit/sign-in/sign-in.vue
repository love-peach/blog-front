<template>
  <modal v-if="isShowSignInModal" @close="handleCloseModel">
    <h3 slot="header">登录</h3>
    <div slot="body">
      <input class="common-input" v-model="formData.account" type="text" placeholder="昵称" style="width: 100%" />
      <input class="common-input" v-model="formData.password" type="password" placeholder="密码" style="width: 100%" />
    </div>
    <div slot="footer">
      <Btn theme="primary" long @click="login" :loading="isLoginLoading">确定登录</Btn>
      <Btn long @click="goToRegister" style="margin-top: 10px;">我要注册</Btn>
    </div>
  </modal>
</template>

<script src="./sign-in.js"></script>
