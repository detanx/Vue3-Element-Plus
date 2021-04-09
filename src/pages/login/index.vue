<template>
  <p>login</p>
  <el-button type="primary" @click="toHome">Home</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import axiosApi from '@/common/request';

const router = useRouter();
const toHome = (() => {
    router.push({
        name: 'home',
    });
});
// axiosApi('/manage/user/login', {
//     phone: 18200176500,
//     pass: 18200176500,
// }).then((res) => {
//     // this.loading = false;
//     if (res.code === 0) {
//         console.log('sss');
//     }
// }).catch((err) => {
//     console.log('err', err);
//     // this.loading = false;
// });
</script>
<style lang="scss" scoped>
</style>
