<template>
  <Listbox v-model="selected" @update:modelValue="onUpdate" :by="keyName">
    <div class="relative mt-1 text-sm">
      <ListboxButton
          class="transition duration-100 ease-in-out border border-gray-light focus:ring-primary-light focus:border-primary focus:outline-none focus:ring-4 focus-visible:ring-4 w-full cursor-default rounded-md bg-white py-2.5 pl-5 pr-10 text-left relative"
      >
        <span v-if="selected" class="block truncate">{{ selected[keyName] }}</span>
        <span v-else>Ничего не выбранно</span>
      </ListboxButton>

      <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
      >
        <ListboxOptions
            class="border border-primary focus:ring-primary-light focus:outline-none focus:ring-4 focus-visible:ring-4 ring-1 ring-black ring-opacity-5 absolute mt-2 max-h-60 w-full overflow-auto rounded bg-white list-none m-0 p-0 z-10"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item[keyName]"
            :value="item"
            as="template"
          >
            <li
                :class="[
                  active ? 'bg-gray-lightest' : '',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
            >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ item[keyName] }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    required: true
  },
  items: {
    type:     Array,
    default:  () => [],
  },
  keyName: {
    type: String,
    default: 'name',
  },
  trackBy: {
    type: String,
    default: 'id'
  }
})

const emit = defineEmits(['update:modelValue'])

let selected = ref(props.modelValue)

if (! Array.isArray(props.modelValue)) {
  for (let item of props.items) {
    if (item[props.trackBy] === props.modelValue) {
      selected.value = item
      break;
    }
  }
}

const onUpdate = (value) => {
  if (! Array.isArray(props.modelValue)) {
    emit('update:modelValue', value[props.trackBy])
  } else {
    emit('update:modelValue', value)
  }
}
</script>