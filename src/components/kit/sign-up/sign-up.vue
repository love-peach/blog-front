<template>
  <modal v-if="isShowSignUpModal" @close="handleCloseModel">
    <h3 slot="header">注册</h3>
    <div slot="body">
      <input class="common-input" v-model="formData.userName" type="text" placeholder="昵称" />
      <input class="common-input" v-model="formData.phone" type="text" placeholder="手机号" />
      <input class="common-input" v-model="formData.email" type="text" placeholder="邮箱" />
      <input class="common-input" v-model="formData.password" type="password" placeholder="密码" />
      <input class="common-input" v-model="formData.confirmPassword" type="password" placeholder="确认密码" />
    </div>
    <div slot="footer">
      <Btn theme="success" long @click="singUp" :loading="isSignUpLoading">确定注册</Btn>
      <Btn theme="primary" long @click="goToLogIn" style="margin-top: 10px;">直接登录</Btn>
    </div>
  </modal>
</template>

<script src="./sign-up.js"></script>
