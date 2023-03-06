<template>
  <div role="checkbox" :class="{'opacity-50': disabled}">
    <div class="flex items-start">
      <input
        :aria-checked="isChecked"
        :aria-describedby="`${id}-checkbox-help`"
        :checked="isChecked"
        :class="classes"
        :disabled="disabled"
        :id="id"
        :name="name"
        :value="value"
        type="checkbox"
        @change="onChange"
      >
      <label class="text-sm font-medium ml-2 -mt-0.5" :for="id"><slot /></label>
    </div>
    <div v-if="hasHelpSlot" class="ml-6">
      <p :id="`${id}-checkbox-help`" class="text-xs text-gray-500"><slot name="help" /></p>
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    default: null
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String
  },
  id: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
  variant: {
    type: String,
    default: 'default',
    validator(type) {
      return ['default', 'danger', 'success'].includes(type)
    },
  },
  value: {
    default: undefined
  },
})

const initialState = props.modelValue

const isChecked = computed(() => {
  if (Array.isArray(initialState)) {
    return initialState.indexOf(props.value) !== -1
  }

  return initialState === props.value
})

const onChange = ({ target }) => {
  if (Array.isArray(props.modelValue)) {
    let modelValue = [...props.modelValue]

    const index = modelValue.indexOf(props.value)

    if (index !== -1) {
      modelValue.splice(index, 1)
    } else {
      modelValue.push(props.value)
    }

    emit('update:modelValue', modelValue)
  } else {
    emit('update:modelValue', target.checked ? props.value : initialState)
  }
}

const slots = useSlots()

const hasHelpSlot = computed(() => {
  return !!slots.help
})

const classes = computed(() => {
  const variants = {
    default:    'border border-blue-400 checked:bg-blue-300 focus:ring-blue-100',
    secondary:  'border border-secondary checked:bg-secondary-light focus:ring-secondary-light',
    danger:   'border border-red checked:bg-red-light focus:ring-red-light',
    success:   'border border-green checked:bg-green-light focus:ring-green-light',
  };

  return {
    'flex-shrink-0 w-4 h-4 focus:ring-2 rounded appearance-none transition duration-100 ease-in-out': true,
    [variants[props.variant]]: true,
  }
})
</script>

<style>
[type=checkbox]:checked {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");
}
</style>
