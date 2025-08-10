<script setup>
import { ref } from 'vue'

const props = defineProps({
    selectedText: {
        type: String,
        default: 'Option 1'
    },
    unselectedOptions: {
        type: Array,
        default: () => ['Option 2', 'Option 3']
    }
})

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="dropdown-btn">
        <div class="dropdown-btn__trigger" @click="toggleDropdown">
            <h2>{{ selectedText }}</h2>
            <img 
                class="dropdown-btn__arrow" 
                :class="{ 'dropdown-btn__arrow--rotated': isOpen }"
                src="@/assets/icons/dropdown-arrow.svg" 
                alt="dropdown arrow"
            >
        </div>
        <transition name="dropdown-btn">
            <div v-if="isOpen" class="dropdown-btn__menu">
                <div 
                    v-for="option in unselectedOptions" 
                    :key="option"
                    class="dropdown-btn__option"
                >
                    <h2>{{ option }}</h2>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/main.scss';

.dropdown-btn {
    background-color: $background-sidebar;
    border-radius: 24px;

    &__trigger {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border-radius: 24px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        background-color: $background-primary;

        &:hover {
            background-color: darken($background-primary, 1.5%);
        }
    }

    &__arrow {
        transition: transform 0.3s ease-in-out;

        &--rotated {
            transform: rotate(180deg);
        }
    }

    &__menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
        background-color: $background-sidebar;
        padding: 12px 8px 8px 8px;
        border-radius: 0 0 24px 24px;
        overflow: hidden;
    }

    &__option {
        padding: 8px;
        border-radius: 25px;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: $background-primary;
        }
    }
}

// Dropdown animation
.dropdown-btn-enter-active,
.dropdown-btn-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 200px;
    opacity: 1;
}

.dropdown-btn-enter-from,
.dropdown-btn-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>