<template>
  <div class="flex flex-col max-h-screen ml-60 mr-60 bg-white">
    <div class="p-8 font-semibold border-b" />
    <div ref="chatContainer" class="flex-1 p-4 overflow-y-auto border-b">
      <div class="text-black w-full">
        <div v-for="(message, index) in messages" :key="index">
          <div v-if="isLoading && !message.content"
            :class="message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'"
            class="mb-4 p-4 rounded-lg">
            <p v-html="renderMarkdown(outputMessage || '...')"></p>
          </div>
          <div
            v-else
            :class="message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'"
            class="mb-4 p-4 rounded-lg"
          >
            <p v-html="renderMarkdown(message.content)"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 bg-white border-t flex-shrink-0 text-black">
      <div class="mx-auto flex gap-2">
        <input
          v-model="inputMessage"
          type="text"
          placeholder="请输入内容..."
          class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          @click="sendMessage"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import OpenAI from 'openai'
import MarkdownIt from 'markdown-it'
import mk from 'markdown-it-mathjax'
import { type ChatMessage } from '@/types/ChatWindowType'

// MathJax 类型声明
declare global {
  interface Window {
    MathJax: {
      startup: {
        promise: Promise<void>
      }
      typesetPromise: (elements?: HTMLElement[]) => Promise<void>
    }
  }
}

// Markdown 处理器配置
const mdi = new MarkdownIt({
  html: true,
  linkify: true,
}).use(mk()) // 添加数学公式插件

// 数学公式渲染
const renderMarkdown = (content: string) => {
  try {
    return mdi.render(content)
  } catch (error) {
    console.log(error)
    return content.replace(/\n/g, '<br>')
  }
}

// MathJax 渲染器
const typeSet = async (elements?: HTMLElement[]) => {
  if (!window.MathJax) return
  try {
    await window.MathJax.startup.promise
    await window.MathJax.typesetPromise(elements)
  } catch (error) {
    console.error('MathJax渲染失败:', error)
  }
}

// 聊天功能相关逻辑
const inputMessage = ref('')
const outputMessage = ref('')
const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: `你好！我是MathGPT，一个数学问题解答系统。如果你有任何数学方面的疑问，随时可以向我提问！😊`,
  },
])
const isLoading = ref(false)
const chatContainer = ref<HTMLElement>()
const openai = new OpenAI({
  baseURL: import.meta.env.VITE_DEEPSEEK_URL,
  apiKey: import.meta.env.VITE_DEEPSEEK_KEY,
  dangerouslyAllowBrowser: true,
})

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      // 渲染数学公式
      typeSet(Array.from(chatContainer.value.querySelectorAll('.math-content')))
    }
  })
}

// 发送消息逻辑
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  messages.value.push({
    role: 'user',
    content: inputMessage.value,
  })

  inputMessage.value = ''
  outputMessage.value = ''
  isLoading.value = true

  messages.value.push({
    role: 'assistant',
    content: '',
  })

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            '你叫MathGPT，是一个数学问题解答系统，请使用Markdown返回答案，数学公式遵循以下规则：1. 行内公式用单个$\n2. 块级公式用$$\n3. 希腊字母直接使用\\符号',
        },
        ...messages.value,
      ],
      model: 'deepseek-chat',
      stream: true,
    })

    for await (const chunk of completion) {
      outputMessage.value += chunk.choices[0].delta.content as string
      await nextTick()
      scrollToBottom()
      typeSet() // 确保最后一次渲染
    }
  } catch (error) {
    messages.value[messages.value.length - 1].content = '请求出错，请重试'
    console.error('API Error:', error)
  } finally {
    messages.value[messages.value.length - 1].content = outputMessage.value
    isLoading.value = false
    await nextTick()
    typeSet() // 确保最后一次渲染
  }
}

// 生命周期钩子
onMounted(() => {
  // 动态加载 MathJax
  // if (!document.querySelector('script[src*="mathjax"]')) {
  //   const script = document.createElement('script')
  //   script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
  //   script.async = true
  //   document.head.appendChild(script)
  // }
})

// 监听消息变化
watch(
  messages,
  async () => {
    await nextTick()
    scrollToBottom()
    typeSet() // 每次消息变化后都触发公式渲染
  },
  { deep: true, immediate: true },
)
</script>

<style>
/* MathJax 样式调整 */
.MathJax {
  font-size: 1.5em !important;
  display: inline-block !important;
}

/* MathJax 公式居中显示 */
.MathJax_Display {
  text-align: center !important;
  margin: 1em 0 !important;
}

/* 代码块样式 */
pre code.hljs {
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem 0;
}
</style>
