<template>
  <div class="grid grid-cols-4 gap-2">
    <div v-for="(image, index) in modelValue" :key="image.id" class="relative">
      <img
        :src="image.url.default"
        :alt="image.url.original"
        :data-src="image.url.original"
        :data-id="image.id"
        data-image
        class="cursor-pointer rounded-lg w-full aspect-square" />
      <button v-if="deletable" @click="onDelete(index)" type="button" class="p-1 bg-slate-200 rounded-lg absolute right-2 top-2">
        <Trash2 class="w-5 h-5 cursor-pointer text-slate-500" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Trash2 } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  deletable: {
    type: Boolean
  }
})

const onDelete = (index) => {
  const images = [...props.modelValue]
  images.splice(index, 1)
  emit('update:modelValue', images)
}
</script>