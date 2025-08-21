<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    question: {
        type: String,
        default: 'What is your question?'
    },
    answer: {
        type: String,
        default: 'This is the answer to your question. It can be a longer, more elaborate text that provides detailed information about the topic.'
    },
    loading: {
        type: Boolean,
        default: false
    },
    initiallyOpen: {
        type: Boolean,
        default: false
    }
})

const isOpen = ref(false)

watchEffect(() => {
    // Set initial open state on mount; does not force-close if it changes later
    if (props.initiallyOpen) {
        isOpen.value = true
    }
})

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const formatAnswer = (answer) => {
    // Convert plain text with line breaks to HTML with proper formatting
    if (!answer) return '';
    
    // Split by double line breaks to separate sections
    const sections = answer.split('\n\n');
    
    // Process each section
    const formattedSections = sections.map(section => {
        const lines = section.trim().split('\n');
        
        if (lines.length === 0) return '';
        
        // First line is the heading (bold)
        const heading = lines[0];
        const subLines = lines.slice(1);
        
        // Format the heading as bold
        const formattedHeading = `<strong>${heading}</strong>`;
        
        // Format sub-lines (questions)
        const formattedSubLines = subLines.map(line => {
            if (line.trim().startsWith('–')) {
                return `<div class="sub-question">${line.trim()}</div>`;
            }
            return `<div>${line.trim()}</div>`;
        }).join('');
        
        // Combine heading and sub-lines
        return `<div class="answer-section">${formattedHeading}${formattedSubLines}</div>`;
    });
    
    return formattedSections.join('');
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
                <div v-if="props.loading" class="question-dropdown__loading">
                    <div class="question-dropdown__spinner" aria-label="Loading"></div>
                    <p>Genererer svar...</p>
                </div>
                <div v-else class="question-dropdown__answer">
                    <div v-html="formatAnswer(answer)"></div>
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

    &__loading {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        border-radius: 16px;
        background-color: #2D2E40;
        color: $text-gray;
    }

    &__answer {
        padding: 16px;
        border-radius: 16px;
        background-color: #2D2E40;
        line-height: 1.6;
        
        .answer-section {
            margin-bottom: 16px;
            
            &:last-child {
                margin-bottom: 0;
            }
            
            strong {
                display: block;
                font-weight: 600;
                color: #E6E6E6;
                margin-bottom: 8px;
                font-size: 16px;
            }
            
            .sub-question {
                margin-left: 16px;
                margin-bottom: 4px;
                color: $text-gray;
                font-size: 14px;
                
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        
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

.question-dropdown__spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: $text-gray;
    border-radius: 50%;
    animation: question-dropdown-spin 0.6s linear infinite;
}

@keyframes question-dropdown-spin {
    to { transform: rotate(360deg); }
}
</style>
