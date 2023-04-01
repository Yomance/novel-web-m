<template>
<van-nav-bar title="充值" placeholder left-arrow @click-left="router.back()"/>

</template>

<script setup lang="ts">import { useRouter } from 'vue-router';
const router = useRouter()
</script>