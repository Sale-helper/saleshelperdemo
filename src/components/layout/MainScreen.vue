<script setup>
import { ref } from 'vue'
import QuestionDropdown from '../QuestionDropdown.vue';
import QuestionInput from '../QuestionInput.vue';
import QuestionBtn from '../QuestionBtn.vue';

const questionDropdowns = ref([])

const generateAnswer = (question) => {
  // Simple answer generation logic - you can expand this with more sophisticated AI responses
  const answers = {
    "Er du bøsse?": "Det er ikke passende at stille sådanne personlige spørgsmål. Jeg er her for at hjælpe med professionelle spørgsmål relateret til salg og kundeservice.",
    "default": "Dette er et interessant spørgsmål. Lad mig hjælpe dig med at finde det bedste svar baseret på dine behov."
  }
  
  return answers[question] || answers.default
}

const handleGenerateQuestion = (question) => {
  const answer = generateAnswer(question)
  const newDropdown = {
    id: Date.now(),
    question: question,
    answer: answer,
    loading: true,
    initiallyOpen: true
  }
  
  questionDropdowns.value.unshift(newDropdown)

  // Clear loading after a short delay to reveal the answer
  setTimeout(() => {
    const idx = questionDropdowns.value.findIndex(d => d.id === newDropdown.id)
    if (idx !== -1) {
      questionDropdowns.value[idx] = {
        ...questionDropdowns.value[idx],
        loading: false
      }
    }
  }, 700)
}
</script>

<template>
  <div class="main">
    <div class="main__top">
      <QuestionDropdown 
        v-for="dropdown in questionDropdowns" 
        :key="dropdown.id"
        :question="dropdown.question"
        :answer="dropdown.answer"
        :loading="dropdown.loading"
        :initiallyOpen="dropdown.initiallyOpen"
      />
    </div>
    <div class="main__bottom">
      <div class="main__btn-wrap">
        <QuestionBtn @generateQuestion="handleGenerateQuestion" />
        <QuestionBtn @generateQuestion="handleGenerateQuestion" />

      </div>
      <QuestionInput />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 16px;
  gap: 16px;

  &__top {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 0 0 auto;
  }

  &__btn-wrap {
    display: flex;
    gap: 16px;
  }

}
</style>
