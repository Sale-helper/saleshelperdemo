<script setup>
const emit = defineEmits(['generateQuestion'])

const question = "Er du bøsse?"

const handleClick = () => {
  emit('generateQuestion', question)
}
</script>

<template>
  <div class="question-btn" @click="handleClick">
    <p>{{ question }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';

.question-btn {
    background-color: #2D2E40;
    width: fit-content;
    padding: 16px;
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    
    &:hover {
        background-color: darken(#2D2E40, 1.5%);
    }
    
    p {
        color: $text-gray;
        margin: 0;
    }
}

 
</style>
