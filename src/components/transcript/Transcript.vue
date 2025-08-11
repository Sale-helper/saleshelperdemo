<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  elapsedMs: { type: Number, default: 0 },
  isRecording: { type: Boolean, default: false }
})

// Demo transcript data with timing
const transcriptData = ref([
  {
    name: "Anders",
    text: "Hej det er anders fra Solcellen gruppen. Hvordan har du det i dag?",
    ms_after_start: 1059,
  },
  {
    name: "Kunde",
    text: "JA hej det er det. Jeg har det fint tak, hvad med dig?",
    ms_after_start: 3500,
  },
  {
    name: "Anders",
    text: "Jeg har det også fint tak. Jeg ringer fordi jeg har set at du har et solcelleanlæg der måske kunne bruge en opdatering.",
    ms_after_start: 6500,
  },
  {
    name: "Kunde",
    text: "Ah ja, det er rigtigt. Det er faktisk ret gammelt nu.",
    ms_after_start: 9500,
  },
  {
    name: "Anders",
    text: "Præcis. Vi har nogle nye modeller der er meget mere effektive. Skal vi ikke tage en snak om det?",
    ms_after_start: 12500,
  },
  {
    name: "Kunde",
    text: "Jo det lyder interessant. Kan du fortælle mig mere?",
    ms_after_start: 15500,
  }
])

// Computed property to show only transcript entries that should be visible based on current time
const visibleTranscripts = computed(() => {
  if (!props.isRecording) return []
  
  return transcriptData.value.filter(entry => 
    entry.ms_after_start <= props.elapsedMs
  )
})

// Auto-scroll to bottom when new entries appear
const transcriptContainer = ref(null)
const isUserScrolling = ref(false)
const lastScrollTop = ref(0)

// Check if user is at bottom of transcript
function isAtBottom() {
  if (!transcriptContainer.value) return true
  const { scrollTop, scrollHeight, clientHeight } = transcriptContainer.value
  return Math.abs(scrollHeight - clientHeight - scrollTop) < 10 // 10px tolerance
}

// Handle scroll events to detect user scrolling
function handleScroll() {
  if (!transcriptContainer.value) return
  
  const currentScrollTop = transcriptContainer.value.scrollTop
  const isScrollingUp = currentScrollTop < lastScrollTop.value
  
  // If user is scrolling up, mark that they're manually scrolling
  if (isScrollingUp && !isAtBottom()) {
    isUserScrolling.value = true
  }
  
  // If user scrolls to bottom, allow auto-scroll again
  if (isAtBottom()) {
    isUserScrolling.value = false
  }
  
  lastScrollTop.value = currentScrollTop
}

watch(visibleTranscripts, () => {
  // Only auto-scroll if user is not manually scrolling
  if (!isUserScrolling.value) {
    // Use nextTick to ensure DOM is updated before scrolling
    nextTick(() => {
      if (transcriptContainer.value) {
        transcriptContainer.value.scrollTop = transcriptContainer.value.scrollHeight
      }
    })
  }
}, { deep: true })

// Import nextTick
import { nextTick } from 'vue'
</script>

<template>
  <div class="transcript">
    <div class="transcript__heading">
      <h2>Transcript</h2>
      <div class="transcript__heading-line"></div>
    </div>
    
    <div v-if="!isRecording" class="transcript__placeholder">
      <p>Start optagelse for at se transcript</p>
    </div>
    
    <div 
      v-else
      ref="transcriptContainer"
      class="transcript__text"
      @scroll="handleScroll"
    >
      <div 
        v-for="(entry, index) in visibleTranscripts" 
        :key="index"
        class="transcript__person"
      >
        <h3>{{ entry.name }}</h3>
        <p>{{ entry.text }}</p>
        <div class="transcript__timestamp">
          {{ Math.floor(entry.ms_after_start / 1000) }}s
        </div>
      </div>
      
      <div v-if="visibleTranscripts.length === 0" class="transcript__waiting">
        <p>Venter på første transcript...</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';

.transcript {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    min-height: 0;
    padding-bottom: 24px;
    z-index: 1; // Ensure transcript stays below dropdown

  &__heading {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-purple;
  }

  &__heading-line {
    width: 100%;
    height: 1px;
    background-color: $text-purple;
  }

  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    color: $text-gray;
    font-style: italic;
  }

  &__waiting {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: $text-gray;
    font-style: italic;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 4px; // Add some padding for the hidden scrollbar
    
    // Hide scrollbar while allowing scroll
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox

    &::-webkit-scrollbar { // Chrome, Safari, Opera
      width: 0;
      height: 0;
    }
  }

  &__person {
    position: relative;
    padding: 12px;
    background-color: rgba(45, 46, 64, 0.3);
    border-radius: 12px;
    z-index: 1; // Ensure person elements stay below dropdown
    
    h3 {
      margin-bottom: 4px;
      color: $text-purple;
    }
    
    p {
      margin-bottom: 4px;
      line-height: 1.5;
    }
  }

  &__timestamp {
    font-size: 12px;
    color: $text-gray;
    font-weight: 500;
  }
}
</style>
