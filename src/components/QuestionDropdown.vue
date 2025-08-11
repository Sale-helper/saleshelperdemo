<script setup>
import { ref } from 'vue';
import SearchBar from './QuestionInput.vue';
import QuestionInput from './QuestionInput.vue';

const searchQuery = ref('');
const handleSearch = () => {
  // Handle search logic here
  console.log('Searching for:', searchQuery.value);
};
</script>

<template>
  <div class="ask-question">
    <QuestionInput 
      v-model="searchQuery"
      placeholder="Stil et spørgsmål..."
      @search="handleSearch"
    />
  </div>
</template>

<style scoped lang="scss">
.ask-question {
    // Styles for the container if needed
}
</style>
