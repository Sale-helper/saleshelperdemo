<script setup>
import { ref, computed } from 'vue'

/*
 * DELAY SYSTEM FOR TRANSCRIPT TEXT
 * 
 * You can add delays within text using special markers:
 * - [DELAY:1000] - Creates a 1-second delay (1000ms)
 * - [PAUSE:500] - Creates a 500ms pause
 * 
 * Examples:
 * "Hello there [DELAY:1000] how are you?" - Types "Hello there", waits 1 second, then types " how are you?"
 * "This is a [PAUSE:800] dramatic pause" - Types "This is a", waits 800ms, then types " dramatic pause"
 * 
 * The delay markers are automatically removed from the displayed text.
 */

const props = defineProps({
  elapsedMs: { type: Number, default: 0 },
  isRecording: { type: Boolean, default: false }
})

// Track the last elapsed time when recording was active
const lastElapsedMs = ref(0)

// Update lastElapsedMs when recording is active
watch(() => props.elapsedMs, (newValue) => {
  if (props.isRecording && newValue > 0) {
    lastElapsedMs.value = newValue
  }
})

// Demo transcript data with timing
const transcriptData = ref([
  {
    name: "Anders",
    text: "Goddag, du snakker med Anders Simonsen, inden fra solcellegruppen af.",
    ms_after_start: 8000,
  },
  {
    name: "Kunde",
    text: "Hej, Anders.",
    ms_after_start: 12000,
  },
  {
    name: "Anders",
    text: "Hej, grunden til at jeg lige ringede, det var i [DELAY:1500] forbindelse med at du havde skrevet dig op til, at du gerne ville modtage et tilbud på et solcelleanlæg. [DELAY:1500] Og i den forbindelse vill jeg lige snakke med dig hvis du havde tid nu.",
    ms_after_start: 13000,
  },
  {
    name: "Kunde",
    text: "Ja, helt sikkert. Det er noget tid siden, at jeg har skrevet mig op, men ja, det er rigtigt.",
    ms_after_start: 24000,
  },
  {
    name: "Anders",
    text: "Ja, jamen, lad os kigge på det. [PAUSE:800] Det er præstebro 8?",
    ms_after_start: 28000,
  },
  {
    name: "Kunde",
    text: "Ja.",
    ms_after_start: 33000,
  },
  {
    name: "Anders",
    text: "Ja, [DELAY:1500] jamen, havde du gjort dig nogle tanker om, hvor det skulle ligge henne, det her anlæg? [DELAY:1500] jeg kan jo se, at der er et hovedhus, men også en lade.",
    ms_after_start: 33500,
  },
  {
    name: "Kunde",
    text: "Ja, [DELAY:1500] ja, altså, der er jo - det kan ikke ligge på hovedhuset, der har vi stråtag, men vi har et anneks, [DELAY:2000] hvor vinklen på taget er lidt højere, [DELAY:500] end det er over på laden.[DELAY:2500] Øhh, [DELAY:2500] men så vidt jeg ved, så, så tror jeg, at annekset er bedre end forhold til taget. Men enten laden eller det her anneks her.",
    ms_after_start: 42000,
  },
  {
    name: "Anders",
    text: "Ja, okay. Ja, altså der er ihvertfald massere rigelig plads på din [DELAY:1500] - på laden - der er bare de her firkanter, der er sådan nogle firkanter på taget, som gør, [DELAY:1500] at vi ikke ville kunne lægge dem der, men annekset er lidt småt i forhold til det. [DELAY:1200] Men det kommer an på, hvor stor et anlæg du skulle ha'. [PAUSE:600] Hvad er sådan dit årlige forbrug? sådan cirka?",
    ms_after_start: 62000,
  },
  {
    name: "Kunde",
    text: "Øhh, jamen, det ved jeg faktisk ikke, [DELAY:2500] fordi vi er lige flyttede, så, altså, [DELAY:3000] og sidst vi boede, der boede vi i lejlighed - [DELAY:1500] så det er jo noget helt andet. [DELAY:1000] Det har jeg svært ved at sige, [DELAY:500] men vi har varmepumpe [DELAY:1500] og vi har ingen elbiler.",
    ms_after_start: 78000,
  },
  {
    name: "Anders",
    text: "Okay, [DELAY:2000] så ja, men det er os lige noget, vi skal finde ud af, så fordi det er det, vi plejer og [DELAY:1500] ligesom kortlægge, hvor stort anlægget skal være ud fra.",
    ms_after_start: 96000,
  },
  {
    name: "Kunde",
    text: "Det er os rigtigt. [DELAY:1500] Det er os rigtigt. Men kan du ikke, kan du ikke lave nogle beregninger på det?",
    ms_after_start: 104000,
  },
  {
    name: "Anders",
    text: "Jo, altså, der vil det kræve, [DELAY:2000] at jeg har nogle informationer fra dig, og dem har jeg jo ikke lige nu, og jeg skal os lige finde ud af, hvilke informationer, det skulle være. Men, [DELAY:1500] men altså sådan [DELAY:1000] - vi kunne måske tage nogle af de næste spørgsmål, øhm?",
    ms_after_start: 108000,
  },
  {
    name: "Kunde",
    text: "Ja, jamen, helt sikkert.",
    ms_after_start: 120000,
  },
  {
    name: "Anders",
    text: "Ja, jamen, [DELAY:2500] hvad hedder det - i forhold til batteri - er det noget, du også vil have med?",
    ms_after_start: 123000,
  },
  {
    name: "Kunde",
    text: "Jamen, altså det er jo ligesom en forudsætning, er det ik'? At man har batteri. [DELAY:3000] Eller hvad?",
    ms_after_start: 131000,
  },
  {
    name: "Anders",
    text: "Altså, man kan godt få et anlæg uden batteri, [DELAY:1500] men ideen går lidt spildt, øhh.",
    ms_after_start: 139000,
  },
  {
    name: "Kunde",
    text: "Ja, ik'?",
    ms_after_start: 144000,
  },
  {
    name: "Anders",
    text: "Det er jo meningen, at man gerne vil have strøm til rådighed, når man gerne vil have strøm til rådighed, [DELAY:1500] og hvis man ikke kører med et batteri, så er det ikke sikkert, at man har lageret noget op. [DELAY:1500] Øhm, øhm, [DELAY:2000] så ja - men altså de her batterier fungerer... [PAUSE:800] man får som udgangspunkt altid et batteri med til anlægget, når man køber de her pakkeløsninger. Men, men [DELAY:1500] de fungere som batteriserimoduler, så man kan altid bygge ovenpå - de er ligesom fremtiddssikret til, at hvis du vil have et større batteri senere.",
    ms_after_start: 148000,
  },
  {
    name: "Kunde",
    text: "Jamen, altså, det jeg egentlig er mest interesseret i at høre Anders, og grunden til at jeg skrev mig op, det er faktisk, hvor meget jeg kan spare. [DELAY:1500] Og du siger jo, at man kan spare mere, hvis man har et [DELAY:700] batteri, fordi så bliver strømmen jo lageret. [DELAY:2500] Så, så jeg kunne virkelig godt tænke mig at få, [DELAY:2000] ligesom - det er jo en stor investering. Inden vi finder ud af, hvor mange år går der til, før jeg får mine penge tilbage, [DELAY:1500] som jeg har investeret i det her.",
    ms_after_start: 176000,
  },
  {
    name: "Anders",
    text: "ja, [DELAY:1500] jamen, der vil jeg også sig lige skulle kræve nogle [DELAY:1500] - der er jo mange faktorer og parametre, der spiller ind. Så, der ville jeg os lige skulle have kræve nogle yderligere informationer. [DELAY:2000] Men jeg ved ikke, om du har mod på at gå videre med de andre spørgsmål, eller om du gerne vil have det afklaret først, [DELAY:800] før vi overhovedet,sætter os ned  og kigger på det.",
    ms_after_start: 198000,
  },
  {
    name: "Kunde",
    text: "Jamen, hvad er der for nogle andre spørgsmål?",
    ms_after_start: 215000,
  },
  {
    name: "Anders",
    text: "Jamen, [DELAY:1500] det er i forhold til anlægget og i forhold til, [DELAY:1000] om jeg sådan skal kunne bygge dig et tilbud. [DELAY:1500] Det er selvfølgelig godt at få afklaret, om du overhovedet er interesseret i første omgang, øhh, ved at få svar på de her spørgsmål først.",
    ms_after_start: 218000,
  },
  {
    name: "Kunde",
    text: "øhm, [DELAY:1500] men altså, du kan jo skyde løs, [DELAY:1500] men jeg er egentlig bare interesseret i at finde ud af, [DELAY:1500] hvad man skal investere i, og hvor lang tid der går, før man får pengene hjem - [DELAY:1000] og meget også i forhold til [DELAY:1500] simpelthen størrelsen af anlægget, [DELAY:1000] så, fordi som du sagde, er der jo plads til ret mange solceller på laden ihvertfald, hvis det er der, vi går ind. [DELAY:3500] Øhm, men det skal jo hellere ikke være sådan, at pengene ikke bliver tjent ind igen.",
    ms_after_start: 230000,
  },
  {
    name: "Anders",
    text: "Nej, [DELAY:1500] men altså det kræver lidt et større regnestykke, så det jeg nødt til lige at skulle regne på. [DELAY:2000] Øhm, men skal vi ikke sige, jeg sender dig en mail med de informationer, jeg har behov for, [DELAY:1500] og så tager jeg udgangspunkt i dem, og så kan jeg måske regne lidt på det.",
    ms_after_start: 257000,
  },
  {
    name: "Kunde",
    text: "Jo, [DELAY:1000] jo.",
    ms_after_start: 270000,
  },
  {
    name: "Anders",
    text: "Jamen, lad os gøre det. Så vil jeg ikke tage mere af din tid.",
    ms_after_start: 273000,
  },
  {
    name: "Kunde",
    text: "Det godt. Du må have en god dag.",
    ms_after_start: 276000,
  },
  {
    name: "Anders",
    text: "I lige måde. Hej.",
    ms_after_start: 278000,
  }
])

// Computed property to show only transcript entries that should be visible based on current time
// Newest entries appear at the top
const visibleTranscripts = computed(() => {
  // Show transcripts even when paused, but only if we have some content
  if (!props.isRecording && transcriptData.value.length === 0) {
    console.log('Not recording and no transcript data, returning empty array')
    return []
  }
  
  if (!props.isRecording) {
    // When paused, show transcripts that were visible when recording stopped
    // Use the last known elapsedMs to show the appropriate transcripts
    const filtered = transcriptData.value.filter(entry => entry.ms_after_start <= lastElapsedMs.value)
    console.log(`Paused - showing ${filtered.length} transcripts based on last elapsed time: ${lastElapsedMs.value}ms`)
    return filtered.reverse() // Newest first
  }
  
  const filtered = transcriptData.value.filter(entry => entry.ms_after_start <= props.elapsedMs)
  console.log(`Filtered ${filtered.length} transcripts from ${transcriptData.value.length} total (elapsedMs: ${props.elapsedMs})`)
  
  return filtered.reverse() // Newest first
})

// Simple typewriter effect with delay support and pause/resume
const typewriterStates = ref(new Map())
const typewriterTimers = ref(new Map()) // Track active timers for pausing
const isTypewriterPaused = ref(false) // Global pause state

function processTextWithDelays(text) {
  // Split text by delay markers and return array of segments
  const segments = []
  let currentText = text
  let offset = 0
  
  // Match [DELAY:1000] or [PAUSE:500] patterns
  const delayRegex = /\[(DELAY|PAUSE):(\d+)\]/g
  let match
  
  while ((match = delayRegex.exec(text)) !== null) {
    const fullMatch = match[0]
    const delayType = match[1]
    const delayMs = parseInt(match[2])
    const matchIndex = match.index
    
    // Add text before the delay marker
    if (matchIndex > offset) {
      segments.push({
        type: 'text',
        content: text.slice(offset, matchIndex),
        delay: 0
      })
    }
    
    // Add the delay
    segments.push({
      type: 'delay',
      content: '',
      delay: delayMs,
      delayType: delayType
    })
    
    offset = matchIndex + fullMatch.length
  }
  
  // Add remaining text after last delay marker
  if (offset < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(offset),
      delay: 0
    })
  }
  
  return segments
}

function startTypewriter(entryId, text) {
  const existingState = typewriterStates.value.get(entryId)
  
  // If entry already exists and is complete, don't restart
  if (existingState && typeof existingState === 'string' && existingState.length >= text.length) {
    return
  }
  
  const segments = processTextWithDelays(text)
  let currentSegmentIndex = 0
  let currentCharIndex = 0
  let currentText = existingState || ''
  
  // If we have existing text, find where we left off
  if (existingState && typeof existingState === 'string' && existingState.length > 0) {
    // Find the current position in the segments
    let accumulatedLength = 0
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      if (segment.type === 'text') {
        if (accumulatedLength + segment.content.length <= existingState.length) {
          accumulatedLength += segment.content.length
          currentSegmentIndex = i + 1
        } else {
          // We're in the middle of this text segment
          currentCharIndex = existingState.length - accumulatedLength
          currentSegmentIndex = i
          break
        }
      }
    }
  }
  
  const processNextSegment = () => {
    if (currentSegmentIndex >= segments.length || isTypewriterPaused.value) return
    
    const segment = segments[currentSegmentIndex]
    
    if (segment.type === 'delay') {
      // Handle delay
      const timerId = setTimeout(() => {
        if (!isTypewriterPaused.value) {
          currentSegmentIndex++
          processNextSegment()
        }
      }, segment.delay)
      
      // Store timer for potential pausing
      typewriterTimers.value.set(entryId, timerId)
    } else {
      // Handle text segment
      const typeNextChar = () => {
        if (currentCharIndex < segment.content.length && !isTypewriterPaused.value) {
          currentText += segment.content[currentCharIndex]
          typewriterStates.value.set(entryId, currentText)
          currentCharIndex++
          
          const timerId = setTimeout(typeNextChar, 30)
          typewriterTimers.value.set(entryId, timerId)
        } else if (currentCharIndex >= segment.content.length) {
          // Move to next segment
          currentSegmentIndex++
          currentCharIndex = 0
          processNextSegment()
        }
      }
      
      typeNextChar()
    }
  }
  
  // Start the typewriter
  processNextSegment()
}

// Function to pause all active typewriters
function pauseAllTypewriters() {
  console.log('Pausing all typewriters')
  isTypewriterPaused.value = true
  typewriterTimers.value.forEach((timerId, entryId) => {
    clearTimeout(timerId)
  })
  typewriterTimers.value.clear()
}

// Function to resume all typewriters
function resumeAllTypewriters() {
  console.log('Resuming all typewriters')
  isTypewriterPaused.value = false
  
  // Restart typewriters for entries that were in progress
  visibleTranscripts.value.forEach(entry => {
    const entryId = `${entry.name}-${entry.ms_after_start}`
    const currentState = typewriterStates.value.get(entryId)
    
    if (currentState && typeof currentState === 'string' && currentState.length > 0 && currentState.length < entry.text.length) {
      // This entry has partial text, restart its typewriter
      console.log('Restarting typewriter for:', entryId)
      startTypewriter(entryId, entry.text)
    }
  })
}

// Start typewriter for new entries
const processedEntries = ref(new Set())

function resetTranscriptStates() {
  console.log('Resetting transcript states - clearing', processedEntries.value.size, 'processed entries and', typewriterStates.value.size, 'typewriter states')
  
  // Clear all active timers
  typewriterTimers.value.forEach((timerId) => {
    clearTimeout(timerId)
  })
  typewriterTimers.value.clear()
  
  processedEntries.value.clear()
  typewriterStates.value.clear()
  // Reset last elapsed time when starting fresh
  lastElapsedMs.value = 0
}

function processNewEntries() {
  visibleTranscripts.value.forEach(entry => {
    const entryId = `${entry.name}-${entry.ms_after_start}`
    if (!processedEntries.value.has(entryId)) {
      processedEntries.value.add(entryId)
      console.log('Starting typewriter for new entry:', entryId)
      startTypewriter(entryId, entry.text)
    }
  })
}

// Watch for changes and process new entries
import { watch } from 'vue'
watch(visibleTranscripts, () => {
  processNewEntries()
}, { immediate: true })

// Reset states when recording starts
watch(() => props.isRecording, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    // Only reset when starting recording (not when resuming from pause)
    // Check if this is a new recording by seeing if elapsedMs is 0
    if (props.elapsedMs === 0) {
      resetTranscriptStates()
      console.log('Transcript states reset, new recording started')
    } else {
      console.log('Recording resumed from pause, resuming typewriters')
      resumeAllTypewriters()
    }
  } else if (!newValue) {
    console.log('Recording paused/stopped, pausing typewriters')
    pauseAllTypewriters()
  }
})

// Also watch for changes in elapsedMs to ensure transcript updates
watch(() => props.elapsedMs, (newValue, oldValue) => {
  if (props.isRecording) {
    // If elapsedMs resets to 0, also reset transcript states
    if (newValue === 0 && oldValue > 0) {
      resetTranscriptStates()
      console.log('Transcript states reset due to timer reset')
    }
    
    if (newValue > 0) {
      console.log('Elapsed time:', newValue, 'ms, visible transcripts:', visibleTranscripts.value.length)
    }
  }
})

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

// Function to clean text for display (remove delay markers)
function cleanDisplayText(text) {
  return text.replace(/\[(DELAY|PAUSE):\d+\]/g, '')
}

// Function to get the display text for an entry
function getDisplayText(entry) {
  const entryId = `${entry.name}-${entry.ms_after_start}`
  const currentState = typewriterStates.value.get(entryId)
  
  if (currentState && typeof currentState === 'string' && currentState.length > 0) {
    return cleanDisplayText(currentState)
  }
  return cleanDisplayText(entry.text)
}


</script>

<template>
  <div class="transcript">
    <div class="transcript__heading">
      <h2>Transcript</h2>
      <div class="transcript__heading-line"></div>
    </div>
    
    <div v-if="!isRecording && visibleTranscripts.length === 0" class="transcript__placeholder">
      <p>Start optagelse for at se transcript</p>
    </div>
    
    <div 
      v-if="visibleTranscripts.length > 0"
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
            {{ getDisplayText(entry) }}
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
