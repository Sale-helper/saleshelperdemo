<script setup>
import { ref } from 'vue'

const props = defineProps({
    question: {
        type: String,
        default: 'What is your question?'
    },
    answer: {
        type: String,
        default: 'This is the answer to your question. It can be a longer, more elaborate text that provides detailed information about the topic.'
    }
})

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="question-dropdown">
        <div class="question-dropdown__trigger" @click="toggleDropdown">
            <h2>{{ question }}</h2>
            <img 
                class="question-dropdown__arrow" 
                :class="{ 'question-dropdown__arrow--rotated': isOpen }"
                src="@/assets/icons/dropdown-arrow.svg" 
                alt="dropdown arrow"
            >
        </div>
        <transition name="question-dropdown">
            <div v-if="isOpen" class="question-dropdown__menu">
                <div class="question-dropdown__answer">
                    <p>{{ answer }}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
@import '@/assets/main.scss';

.question-dropdown {
    background-color: #2D2E40;
    border-radius: 24px;
    color: $text-gray;

    &__trigger {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border-radius: 24px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        background-color: #2D2E40;
        color: $text-gray;

        &:hover {
            background-color: darken(#2D2E40, 1.5%);
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
        background-color: #2D2E40;
        padding: 12px 8px 8px 8px;
        border-radius: 0 0 24px 24px;
        overflow: hidden;
    }

    &__answer {
        padding: 16px;
        border-radius: 16px;
        background-color: #2D2E40;
        line-height: 1.6;
        
        p {
            margin: 0;
            color: inherit;
        }
    }
}

// Dropdown animation
.question-dropdown-enter-active,
.question-dropdown-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 200px;
    opacity: 1;
}

.question-dropdown-enter-from,
.question-dropdown-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>
