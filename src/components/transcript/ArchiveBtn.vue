<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Arkiver transcript' },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['archive'])

function handleClick() {
  if (props.disabled) return
  emit('archive')
}

const buttonClasses = computed(() => [
  'archive-btn',
  props.disabled ? 'archive-btn--disabled' : 'archive-btn--enabled',
])

function onEnter(el) {
  const cs = getComputedStyle(el)
  const paddingLeft = parseFloat(cs.paddingLeft) || 0
  const paddingRight = parseFloat(cs.paddingRight) || 0
  el.dataset.pl = String(paddingLeft)
  el.dataset.pr = String(paddingRight)

  const previousWidth = el.style.width
  el.style.width = 'auto'
  const targetWidth = el.getBoundingClientRect().width
  el.style.width = previousWidth || ''

  el.style.overflow = 'hidden'
  el.style.width = '0px'
  el.style.paddingLeft = '0px'
  el.style.paddingRight = '0px'
  el.style.opacity = '0'

  void el.offsetWidth
  el.style.transition = 'width 200ms ease, padding 200ms ease, opacity 200ms ease'
  el.style.width = targetWidth + 'px'
  el.style.paddingLeft = paddingLeft + 'px'
  el.style.paddingRight = paddingRight + 'px'
  el.style.opacity = '1'
}

function onAfterEnter(el) {
  el.style.transition = ''
  el.style.width = ''
  el.style.paddingLeft = ''
  el.style.paddingRight = ''
  el.style.opacity = ''
  el.style.overflow = ''
}

function onLeave(el) {
  const cs = getComputedStyle(el)
  const paddingLeft = parseFloat(cs.paddingLeft) || 0
  const paddingRight = parseFloat(cs.paddingRight) || 0
  const startWidth = el.getBoundingClientRect().width

  el.style.overflow = 'hidden'
  el.style.width = startWidth + 'px'
  el.style.paddingLeft = paddingLeft + 'px'
  el.style.paddingRight = paddingRight + 'px'
  el.style.opacity = '1'

  void el.offsetWidth
  el.style.transition = 'width 200ms ease, padding 200ms ease, opacity 200ms ease'
  el.style.width = '0px'
  el.style.paddingLeft = '0px'
  el.style.paddingRight = '0px'
  el.style.opacity = '0'
}

function onAfterLeave(el) {
  el.style.transition = ''
  el.style.width = ''
  el.style.paddingLeft = ''
  el.style.paddingRight = ''
  el.style.opacity = ''
  el.style.overflow = ''
}
</script>

<template>
  <transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave" @after-leave="onAfterLeave">
    <button v-if="!disabled" :class="buttonClasses" :disabled="disabled" @click="handleClick">
      <h3>{{ label }}</h3>
    </button>
  </transition>
  
</template>

<style scoped lang="scss">
.archive-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2D2E40;
  border-radius: 24px;
  padding: 12px;
  text-wrap: nowrap;
  border: none;
  cursor: pointer;
  transition: none;
}

.archive-btn--disabled {
  cursor: not-allowed;
}
</style>


