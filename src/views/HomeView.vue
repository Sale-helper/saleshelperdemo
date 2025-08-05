<script setup>
import DropdownNav from '@/components/DropdownNav.vue';
</script>

<template>
    <div class="sidebar">
     <DropdownNav />
    </div>
</template>

<style scoped>
.sidebar {
  width: 400px;
  height: 100vh;
  background-color: #1A1C21;
  flex-shrink: 0;
  padding: 16px;
}
</style>