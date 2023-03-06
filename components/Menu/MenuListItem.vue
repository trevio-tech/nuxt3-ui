<template>
  <li role="menuitem" class="menu-list-item flex items-center leading-loose space-x-2" :class="[`menu-list-item--${variant}`]">
    <slot name="icon"></slot>
    <slot></slot>
  </li>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<style>
.menu-list-item {
  @apply p-2 rounded;
  cursor: pointer;
}
.menu-list-item--default:hover {
  background-color: #6c6cbb;
  color: white;
}
.menu-list-item--negative:hover {
  background-color: #f1636b;
  color: white;
}
.menu-list-item a {
  display: block;
}
</style>