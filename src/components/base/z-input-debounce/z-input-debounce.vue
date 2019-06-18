<template>
  <input type="text" @input="handleInput" />
</template>

<script>
let timer = null;

export default {
  name: 'ZInputDebounce',
  methods: {
    handleInput(e) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.$emit('input', e);
      }, 300);
    },
  },
};
</script>
