<template>
  <header class="bg-white-600 text-white shadow-md fixed top-0 w-full z-50">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="text-2xl font-bold">
        Math Solver
      </div>
      <div class="hidden md:flex space-x-6">
        主页
      </div>
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
  </header>
  <router-view />
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
