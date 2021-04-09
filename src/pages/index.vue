<template>
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <div class="detanx">detanx</div>
    <el-button type="primary">保存</el-button>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .detanx {
        color: $color;
    }
}
</style>
