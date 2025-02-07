<template>
  <header-menu />
  <aside-menu />
  <div class="w-full flex flex-col min-h-screen  bg-white">
    <div class="p-8 font-semibold border-b" />
    <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto border-b">
      <div class=" mx-auto text-black">
        <div v-for="(message, index) in messages" :key="index" :class="message.isUser ? 'text-right' : 'text-left'">
          <div :class="message.isUser ? 'bg-blue-100' : 'bg-gray-100'" class="mb-4 p-4 rounded-lg">
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 bg-white border-t flex-shrink-0 text-black">
      <div class=" mx-auto flex gap-2">
        <input
          v-model="userMessage"
          type="text"
          placeholder="请输入内容..."
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </div>
  </div>
  <moder />
</template>

<script setup lang="ts">
import { onUpdated, ref } from "vue";

import AsideMenu from "@/components/AsideMenu.vue";
import HeaderMenu from "@/components/HeaderMenu.vue";
import Moder from "@/components/ModalBox.vue";

const messages = ref<{ text: string, isUser: boolean }[]>([
  { text: "你好！请问有什么可以帮助您的？", isUser: false }
]);

const userMessage = ref("");

const sendMessage = () => {
  if (userMessage.value.trim()) {
    messages.value.push({ text: userMessage.value, isUser: true });
    userMessage.value = "";
    messages.value.push({ text: "这是自动回复消息。", isUser: false });
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  const chatContainer = document.querySelector("[ref=\"chatContainer\"]") as HTMLElement;
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

onUpdated(() => {
  scrollToBottom();
});
</script>

<style scoped>

</style>

