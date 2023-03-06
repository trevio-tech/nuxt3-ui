<template>
  <component
    :is="as"
    :to="to"
    v-bind="$attrs"
    class="block bg-white py-2 px-3 hover:bg-slate-100 cursor-pointer rounded-lg"
    @click="$emit('click')"
  >
    <slot></slot>
  </component>
</template>

<script setup>
defineEmits(['click'])

const props = defineProps({
  as: {
    type:    String,
    default: 'nuxt-link'
  },
  to: {
    type: [String, Object]
  }
})
</script>