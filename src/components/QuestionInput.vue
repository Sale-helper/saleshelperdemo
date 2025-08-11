<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Stil et spørgsmål...'
  },
  modelValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue', 'search']);
</script>

<template>
  <div class="question-input">
    <input 
      class="question-input__input" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('search')"
    >
    <button 
      class="question-input__send-btn" 
      type="button"
      @click="$emit('search')"
    >
      <img src="@/assets/icons/send.svg" alt="Send">
    </button>
  </div>
</template>

<style scoped lang="scss">
.question-input {
    position: relative;
    display: flex;
    align-items: center;

    &__input {
        width: 100%;
        height: 60px;
        border-radius: 48px;
        border: none;
        background-color: #1A1C21;
        font-size: 20px;
        padding: 12px 16px;
        padding-right: 60px; // Make room for the button
        color: white;
        
        &::placeholder {
            color: #767692;
        }
    }

    &__send-btn {
        position: absolute;
        right: 8px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background-color: #2D2E40;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #23232C;
        }
    }
}
</style>
