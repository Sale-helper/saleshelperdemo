<script setup>
import { ref } from 'vue'
import DropdownNav from '@/components/dropdown-menu/DropdownNav.vue'
import RecordBtn from '@/components/transcript/RecordBtn.vue'
import ArchiveBtn from '@/components/transcript/ArchiveBtn.vue'
import Transcript from '@/components/transcript/Transcript.vue'

const isRecording = ref(false)
const elapsedSeconds = ref(0)
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
    elapsedSeconds.value += 1
  }, 1000)
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
  // TODO: Integrate with repository/store to persist archive action
  // Placeholder for now
  hasArchived.value = true
  elapsedSeconds.value = 0
}
</script>

<template>
  <div class="sidebar">
    <DropdownNav />
    <div class="sidebar__buttom">
      <div class="sidebar__record-wrap">
        <RecordBtn
          :is-recording="isRecording"
          :formatted-time="formatTime(elapsedSeconds)"
          status-recording-text="Optager"
          status-stopped-text="Stoppet"
          @toggle="toggleRecording"
        />
        <ArchiveBtn class="sidebar__archive-button" :disabled="isRecording || hasArchived" @archive="archiveCurrent" />
      </div>
      <Transcript />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: relative;
  box-sizing: border-box;
  width: 400px;
  height: 100vh;
  background-color: #1a1c21;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  &__buttom {
    display: flex;
    flex-direction: column;
    margin: 0 16px;
    padding-top: 114px;
    gap: 24px;
    flex: 1;
    min-height: 0; // so children like transcript can scroll
  }

  &__record-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
