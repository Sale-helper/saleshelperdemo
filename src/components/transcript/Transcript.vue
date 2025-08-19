<script setup>
import { ref, computed } from 'vue'

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
// Newest entries appear at the top
const visibleTranscripts = computed(() => {
  if (!props.isRecording) return []
  
  return transcriptData.value
    .filter(entry => entry.ms_after_start <= props.elapsedMs)
    .reverse() // Newest first
})

// Simple typewriter effect
const typewriterStates = ref(new Map())

function startTypewriter(entryId, text) {
  if (typewriterStates.value.has(entryId)) return
  
  let currentIndex = 0
  const fullText = text
  
  const typeNextChar = () => {
    if (currentIndex < fullText.length) {
      typewriterStates.value.set(entryId, fullText.slice(0, currentIndex + 1))
      currentIndex++
      setTimeout(typeNextChar, 30)
    }
  }
  
  typeNextChar()
}

// Start typewriter for new entries
const processedEntries = ref(new Set())

function processNewEntries() {
  visibleTranscripts.value.forEach(entry => {
    const entryId = `${entry.name}-${entry.ms_after_start}`
    if (!processedEntries.value.has(entryId)) {
      processedEntries.value.add(entryId)
      startTypewriter(entryId, entry.text)
    }
  })
}

// Watch for changes and process new entries
import { watch } from 'vue'
watch(visibleTranscripts, () => {
  processNewEntries()
}, { immediate: true })

// Auto-scroll to top when new entries appear
const transcriptContainer = ref(null)
const isUserScrolling = ref(false)
let scrollTimeout = null

function handleScroll() {
  if (!transcriptContainer.value) return
  
  const { scrollTop } = transcriptContainer.value
  const isAtTop = scrollTop < 10
  
  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  
  // If user scrolls away from top, mark as manually scrolling
  if (!isAtTop) {
    isUserScrolling.value = true
  } else {
    // If user returns to top, allow auto-scroll again
    isUserScrolling.value = false
  }
}

function scrollToTop() {
  if (!isUserScrolling.value && transcriptContainer.value) {
    transcriptContainer.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

// Watch for new entries and scroll to top
watch(visibleTranscripts, () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(scrollToTop, 200)
}, { deep: true })
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
      <div class="transcript__entries">
        <div 
          v-for="(entry, index) in visibleTranscripts" 
          :key="`${entry.name}-${entry.ms_after_start}`"
          class="transcript__person"
        >
          <h3>{{ entry.name }}</h3>
          <p class="transcript__text-content">
            {{ typewriterStates.get(`${entry.name}-${entry.ms_after_start}`) || entry.text }}
          </p>
          <div class="transcript__timestamp">
            {{ Math.floor(entry.ms_after_start / 1000) }}s
          </div>
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
  z-index: 1;

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
    padding-right: 4px;
    
    // Hide scrollbar while allowing scroll
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__entries {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__person {
    position: relative;
    padding: 12px;
    background-color: rgba(45, 46, 64, 0.3);
    border-radius: 12px;
    z-index: 1;
    
    h3 {
      margin-bottom: 4px;
      color: $text-purple;
    }
    
    p {
      margin-bottom: 4px;
      line-height: 1.5;
    }
  }

  &__text-content {
    position: relative;
    min-height: 1.5em;
  }

  &__timestamp {
    font-size: 12px;
    color: $text-gray;
    font-weight: 500;
  }
}
</style>
