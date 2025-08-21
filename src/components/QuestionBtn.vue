<script setup>
import { computed } from 'vue'

const props = defineProps({
  question: { type: String, default: "Hvordan beregner jeg kundens årlige forbrug ud fra de informationer?" },
  timestamp: { type: Number, default: 0 }, // Time in milliseconds when button should appear
  elapsedMs: { type: Number, default: 0 }, // Current elapsed time from recording
  isRecording: { type: Boolean, default: false } // Whether recording is active
})

const emit = defineEmits(['generateQuestion'])

// Only show button when recording has reached the specified timestamp
const isVisible = computed(() => {
  // If not recording, don't show button
  if (!props.isRecording) return false
  
  // If we've reached the timestamp, show the button
  if (props.elapsedMs >= props.timestamp) return true
  
  return false
})

const handleClick = () => {
  emit('generateQuestion', props.question)
}
</script>

<template>
  <Transition name="fade-slide">
    <div 
      v-if="isVisible" 
      class="question-btn" 
      @click="handleClick"
    >
      <p>{{ question }}</p>
    </div>
  </Transition>
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

/* Transition animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
