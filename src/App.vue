<template>
  <div id="app">
    <router-view />
    <SignIn />
    <SignUp />
  </div>
</template>

<script>
import SignIn from '@/components/kit/sign-in/';
import SignUp from '@/components/kit/sign-up/';

export default {
  name: 'app',
  components: {
    SignIn,
    SignUp,
  },
  mounted() {
    window.$toast = this.$toast;
  },
};
</script>
