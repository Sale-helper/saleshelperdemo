<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    selectedText: {
        type: String,
        default: 'Option 1'
    },
    unselectedOptions: {
        type: Array,
        default: () => ['Option 2', 'Option 3']
    },
    closeSignal: {
        type: Number,
        default: 0
    }
})

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

watch(
    () => props.closeSignal,
    () => {
        isOpen.value = false
    }
)
</script>

<template>
    <div class="btn-container">
        <div class="selected" @click="toggleDropdown">
            <h2>{{ selectedText }}</h2>
            <img 
                class="dropdown-arrow" 
                :class="{ 'rotated': isOpen }"
                src="@/assets/icons/dropdown-arrow.svg" 
                alt="dropdown arrow"
            >
        </div>
        <transition name="dropdown">
            <div v-if="isOpen" class="unselected">
                <div 
                    v-for="option in unselectedOptions" 
                    :key="option"
                    class="unselected-specific"
                >
                    <h2>{{ option }}</h2>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/main.scss';

.btn-container {
    background-color: $background-sidebar;
    border-radius: 24px;
}

.btn-container .selected {
    background-color: $background-primary;
}

.selected {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-radius: 24px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    
    &:hover {
        background-color: darken($background-primary, 1.5%);
    }
}

.dropdown-arrow {
    transition: transform 0.3s ease-in-out;
    
    &.rotated {
        transform: rotate(180deg);
    }
}

.unselected {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: $background-sidebar;
    padding: 12px 8px 8px 8px;
    border-radius: 0 0 24px 24px;
    overflow: hidden;
}

.unselected-specific {
    padding: 8px;
    border-radius: 25px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    
    &:hover {
        background-color: $background-primary;
    }
}

// Dropdown animation
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 200px;
    opacity: 1;
}

.dropdown-enter-from,
.dropdown-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>