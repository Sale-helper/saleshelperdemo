<script setup>
import { ref } from 'vue'
import DropdownNav from '@/components/dropdown-menu/DropdownNav.vue'
import RecordBtn from '@/components/transcript/RecordBtn.vue'
import ArchiveBtn from '@/components/transcript/ArchiveBtn.vue'
import GenerateOfferBtn from '@/components/transcript/GenerateOfferBtn.vue'
import Transcript from '@/components/transcript/Transcript.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import MainScreen from '@/components/layout/MainScreen.vue'
import OfferForm from '@/components/transcript/OfferForm.vue'

const isRecording = ref(false)
const elapsedSeconds = ref(0)
const elapsedMs = ref(0)
const hasArchived = ref(true)
const hasClickedArchive = ref(false) // Track if archive button has been clicked
const isNewRecording = ref(true) // Track if this is a new recording
const showOfferForm = ref(false) // Track if offer form should be shown
const isLoadingOffer = ref(false) // Track loading state for offer generation
let timerId = null

// Reference to RecordBtn component to access resetAudio function
const recordBtnRef = ref(null)

function toggleRecording() {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    hasArchived.value = false
    hasClickedArchive.value = false // Reset archive click state when starting new recording
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
  hasClickedArchive.value = true // Mark that archive button has been clicked
  elapsedSeconds.value = 0
  elapsedMs.value = 0
  isNewRecording.value = true // Reset to new recording state
  
  // Reset audio to beginning when archiving
  if (recordBtnRef.value && recordBtnRef.value.resetAudio) {
    recordBtnRef.value.resetAudio()
  }
}

function handleGenerateOffer() {
  console.log('Generating offer...')
  isLoadingOffer.value = true
  
  // Simulate loading time (you can adjust this or remove the timeout if not needed)
  setTimeout(() => {
    isLoadingOffer.value = false
    showOfferForm.value = true
  }, 1500) // 1.5 seconds loading time
}

function closeOfferForm() {
  showOfferForm.value = false
}
</script>

<template>
  <div class="home">
    <Sidebar>
      <template #header>
        <DropdownNav />
      </template>

      <div class="sidebar__record-wrap">
        <div class="sidebar__record-buttons">
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
        
        <!-- Show GenerateOfferBtn underneath RecordBtn after archive is clicked -->
        <GenerateOfferBtn
          v-if="hasClickedArchive"
          class="sidebar__generate-offer-button"
          @generate="handleGenerateOffer"
        />
      </div>
      <Transcript :elapsed-ms="elapsedMs" :is-recording="isRecording" />
    </Sidebar>
    
    <!-- Main Content Area -->
    <div class="main-content-area">
      <!-- Loading Animation -->
      <div v-if="isLoadingOffer" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <h3>Genererer tilbud...</h3>
          <p>Vent venligst mens vi forbereder dit tilbud</p>
        </div>
      </div>
      
      <!-- Main Content -->
      <MainScreen 
        v-if="!showOfferForm && !isLoadingOffer"
        :is-recording="isRecording"
        :elapsed-ms="elapsedMs"
      />
      <OfferForm 
        v-if="showOfferForm"
        @close="closeOfferForm"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  background-color: #23232c;
}

.main-content-area {
  position: relative;
  flex: 1;
}

.sidebar__record-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar__record-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar__generate-offer-button {
  margin-top: 8px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #23232c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-content {
  text-align: center;
  color: #ffffff;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #3A3B4F;
  border-top: 4px solid #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
}

.loading-content h3 {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
}

.loading-content p {
  margin: 0;
  color: #B8B9C5;
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
