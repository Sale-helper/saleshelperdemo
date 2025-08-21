<script setup>
import { computed, ref, onMounted } from 'vue'
import recordingIcon from '@/assets/icons/recording.svg'
import stoppedIcon from '@/assets/icons/stopped.svg'
import pauseIcon from '@/assets/icons/pause.svg'
import startIcon from '@/assets/icons/start.svg'

const props = defineProps({
  isRecording: { type: Boolean, default: false },
  statusRecordingText: { type: String, default: 'Optager' },
  statusStoppedText: { type: String, default: 'Stoppet' },
  formattedTime: { type: String, default: '00:00' },
})

const emit = defineEmits(['toggle'])

const statusIcon = computed(() => (props.isRecording ? recordingIcon : stoppedIcon))
const actionIcon = computed(() => (props.isRecording ? pauseIcon : startIcon))
const statusText = computed(() => (props.isRecording ? props.statusRecordingText : props.statusStoppedText))
const recordClasses = computed(() => ['record', props.isRecording ? 'record--recording' : 'record--stopped'])

// Video element reference for audio playback
const videoRef = ref(null)
// Track if this is the first play to know when to reset to beginning
const isFirstPlay = ref(true)

// Expose reset function to parent component
const resetAudio = () => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
    isFirstPlay.value = true
    console.log('Audio reset to beginning')
  }
}

// Expose the reset function to parent
defineExpose({ resetAudio })

onMounted(() => {
  // Set up video element for audio-only playback
  if (videoRef.value) {
    videoRef.value.muted = false // Allow audio
    videoRef.value.volume = 1.0 // Set volume to maximum
    videoRef.value.controls = false // Hide controls
  }
})

function handleToggle() {
  // Handle audio playback based on recording state
  if (videoRef.value) {
    try {
      if (props.isRecording) {
        // If currently recording, pause the audio when stopping
        videoRef.value.pause()
        console.log('Audio paused')
      } else {
        // If not recording, start playing audio when starting
        if (isFirstPlay.value) {
          // First time playing, start from beginning
          videoRef.value.currentTime = 0
          isFirstPlay.value = false
        }
        // Resume from current position (where it was paused)
        const playPromise = videoRef.value.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio resumed playing successfully')
            })
            .catch(error => {
              console.error('Error playing audio:', error)
            })
        }
      }
    } catch (error) {
      console.error('Error in handleToggle:', error)
    }
  }
  emit('toggle')
}
</script>

<template>
    <div :class="recordClasses">
        <div class="record__status-wrap">
            <img class="record__status" :src="statusIcon" alt="Recording status">
            <h3>{{ statusText }}</h3>
        </div>
        <div class="record__status-wrap">
            <h3>{{ formattedTime }}</h3>
            <img class="record__start-stop" :src="actionIcon" alt="Start/Stop" @click="handleToggle">
        </div>
        
        <!-- Hidden video element for transcript.mp4 audio playback -->
        <video 
            ref="videoRef" 
            src="@/assets/transcript.mp4" 
            preload="auto"
            style="display: none; width: 0; height: 0;"
            muted="false"
        ></video>
    </div>
</template>

<style scoped lang="scss">

.record {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    padding: 12px;
    flex: 1 1 auto;
    min-width: 0;

    &__status-wrap {
        display: flex;
        gap: 12px;
    }

    &__start-stop {
        cursor: pointer;
    }
}

.record--recording {
    background-color: #95F2D950;
}

.record--stopped {
    background-color: #E6BA8550;
}

.record--recording h3 {
    color: #95F2D9;
}

.record--stopped h3 {
    color: #E6BA85;
}

</style>