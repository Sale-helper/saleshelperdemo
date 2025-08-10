<script setup>
import { computed } from 'vue'
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

function handleToggle() {
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