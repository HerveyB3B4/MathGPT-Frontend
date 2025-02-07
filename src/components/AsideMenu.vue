<template>
  <div class="h-screen w-56 bg-white shadow-lg flex flex-col top-0 left-0 fixed">
    <div class="p-8 font-semibold border-b" />
    <n-menu class="flex-1 p-4 " :options="menuOptions" />
    <div class="p-4 border-t">
      <n-button type="primary" block>
        我的资源库
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NMenu } from "naive-ui";
import { h } from "vue";

const menuOptions = [
  {
    label: "对话",
    key: "对话",
    icon: () => h("i", { class: "text-xl" })
  },
  {
    label: "Users",
    key: "users",
    icon: () => h("i", { class: "text-xl" })
  },
  {
    label: "Settings",
    key: "settings",
    icon: () => h("i", { class: "text-xl" })
  }
];
</script>

<style scoped>
</style>
