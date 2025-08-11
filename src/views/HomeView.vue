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
let timerId = null

function toggleRecording() {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    hasArchived.value = false
    startTimer()
  } else {
    stopTimer()
  }
}

function startTimer() {
  if (timerId) return
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
    <MainScreen />
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
