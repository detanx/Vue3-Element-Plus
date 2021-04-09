<template>
  <p>home</p>
  <el-button type="primary" @click="toLogin">Login</el-button>
</template>
<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();
const toLogin = (() => {
    router.push({
        name: 'login',
    });
});
</script>
<style lang="scss" scoped>
</style>
