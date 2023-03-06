<template>
  <div role="none" class="menu bg-white p-1 overflow-hidden rounded-md shadow ring-1 ring-slate-200">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.menu {
  &-list + &-list {
    &:before {
      @apply my-2 -mx-1 bg-slate-200;
      display: block;
      content: '';
      height: 1px;
    }
  }
}
</style>