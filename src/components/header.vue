<template>
  <header class="bg-white shadow-md fixed top-0 w-full z-50 left-0 m-0">
    <div class="container mx-auto flex items-center justify-between p-4">
      <img src="/icon.svg" class="h-10 "/>
      <div class="text-2xl font-bold text-black">
        Math Solver
      </div>
      <div class="text-white">
      <div class="flex space-x-4">
        <button
          @click="handleLogin"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          登录
        </button>
        <button
          @click="handleLogout"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          注销
        </button>
        <button
          @click="handleSignUp"
          class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          注册
        </button>
      </div>
      </div>
    </div>
  </header>
    <div class="flex=1 mt=16">
      <router-view />
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogin = () => {
  router.push('/login');
};

const handleSignUp = () => {
  router.push('/signup');
};

const handleLogout = () => {
  router.push('/signup');
};
</script>

<style scoped>
</style>
