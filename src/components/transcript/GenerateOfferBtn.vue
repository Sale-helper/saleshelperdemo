<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Generer tilbud' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['generate'])

function handleClick() {
  if (props.disabled) return
  emit('generate')
}

const buttonClasses = computed(() => [
  'generate-offer-btn',
  props.disabled ? 'generate-offer-btn--disabled' : 'generate-offer-btn--enabled',
])
</script>

<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled" 
    @click="handleClick"
  >
    <h3>{{ label }}</h3>
  </button>
</template>

<style scoped lang="scss">
.generate-offer-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2D2E40;
  border-radius: 24px;
  padding: 12px;
  text-wrap: nowrap;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  
  &:hover:not(:disabled) {
    background-color: #23232C;
  }
}

.generate-offer-btn--enabled {
  cursor: pointer;
}

.generate-offer-btn--disabled {
  cursor: not-allowed;
  background-color: #1A1C21;
  color: #9499A5;
}

h3 {
  color: #767692;
}
</style>
