<template>
  <button class="min-w-[50px] flex items-center space-x-2 py-1 px-2 bg-stone-100 ring-1 ring-slate-200 rounded-lg" @click="emit('click')">
    <MessageSquare class="w-4 h-4" />
    <span class="text-sm font-medium text-gray-dark">{{ messagesCount }}</span>
  </button>
</template>

<script setup>
import { MessageSquare } from 'lucide-vue-next'

const emit = defineEmits(['click'])

const props = defineProps({
  messagesCount: {
    type:    Number,
    default: 0,
  },
})
</script>