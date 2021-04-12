<template>
  <el-button type="primary" @click="$i18n.locale = $i18n.locale === 'en' ? 'zh-cn' : 'en'">
    {{$t("user.changeLang")}}
  </el-button>
  <p style="margin: 10px;">{{$t("user.name")}}</p>
  <el-button type="primary" @click="toLogin">{{$t("home.toLogin")}}</el-button>
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
