<script setup>
</script>

<template>
  <div class="sidebar">
    <slot name="header"></slot>
    <div class="sidebar__content">
      <slot></slot>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
.sidebar {
  position: relative;
  box-sizing: border-box;
  width: 400px;
  height: 100vh;
  background-color: #1a1c21;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    margin: 0 16px;
    padding-top: 114px;
    gap: 24px;
    flex: 1;
    min-height: 0; // so children like transcript can scroll
  }
}
</style>


