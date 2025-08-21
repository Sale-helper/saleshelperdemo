<script setup>
import { ref } from 'vue'
import DropdownNav from '@/components/dropdown-menu/DropdownNav.vue'
import RecordBtn from '@/components/transcript/RecordBtn.vue'
import ArchiveBtn from '@/components/transcript/ArchiveBtn.vue'
import Transcript from '@/components/transcript/Transcript.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import MainScreen from '@/components/layout/MainScreen.vue'

const isRecording = ref(false)
const elapsedSeconds = ref(0)
const elapsedMs = ref(0)
const hasArchived = ref(true)
const isNewRecording = ref(true) // Track if this is a new recording
let timerId = null

// Reference to RecordBtn component to access resetAudio function
const recordBtnRef = ref(null)

function toggleRecording() {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    hasArchived.value = false
    if (isNewRecording.value) {
      // Reset timer only for new recordings
      elapsedMs.value = 0
      elapsedSeconds.value = 0
      console.log('Starting new recording, timer reset')
    } else {
      console.log('Resuming recording from pause')
    }
    startTimer()
  } else {
    stopTimer()
    // Mark that this is no longer a new recording
    isNewRecording.value = false
  }
}

function startTimer() {
  // Clear any existing timer first
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
  
  timerId = setInterval(() => {
    elapsedMs.value += 100
    // Update seconds every 1000ms
    if (elapsedMs.value % 1000 === 0) {
      elapsedSeconds.value += 1
    }
  }, 100)
}

function stopTimer() {
  if (!timerId) return
  clearInterval(timerId)
  timerId = null
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function archiveCurrent() {
  hasArchived.value = true
  elapsedSeconds.value = 0
  elapsedMs.value = 0
  isNewRecording.value = true // Reset to new recording state
  
  // Reset audio to beginning when archiving
  if (recordBtnRef.value && recordBtnRef.value.resetAudio) {
    recordBtnRef.value.resetAudio()
  }
}
</script>

<template>
  <div class="home">
    <Sidebar>
      <template #header>
        <DropdownNav />
      </template>

      <div class="sidebar__record-wrap">
        <RecordBtn
          ref="recordBtnRef"
          :is-recording="isRecording"
          :formatted-time="formatTime(elapsedSeconds)"
          status-recording-text="Optager"
          status-stopped-text="Stoppet"
          @toggle="toggleRecording"
        />
        <ArchiveBtn
          class="sidebar__archive-button"
          :disabled="isRecording || hasArchived"
          @archive="archiveCurrent"
        />
      </div>
      <Transcript :elapsed-ms="elapsedMs" :is-recording="isRecording" />
    </Sidebar>
    <MainScreen 
      :is-recording="isRecording"
      :elapsed-ms="elapsedMs"
    />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  background-color: #23232c;
}

.sidebar__record-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
