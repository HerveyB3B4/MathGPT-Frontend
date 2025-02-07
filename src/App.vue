<template>
    <div >
      <router-view />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>
</style>
