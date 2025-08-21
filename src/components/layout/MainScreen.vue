<script setup>
import { ref } from 'vue'
import QuestionDropdown from '../QuestionDropdown.vue';
import QuestionInput from '../QuestionInput.vue';
import QuestionBtn from '../QuestionBtn.vue';

const props = defineProps({
  isRecording: { type: Boolean, default: false },
  elapsedMs: { type: Number, default: 0 }
})

const questionDropdowns = ref([])
const clickedButtons = ref([])

// Define question buttons with their timestamps (in milliseconds)
const questionButtons = ref([
  {
    id: 1,
    question: "Hvilke informationer skal jeg bruge for at beregne en kundes årlige forbrug?",
    answer: "Boligtype & størrelse\n– \"Bor du i parcelhus, rækkehus eller lejlighed – og hvor mange m² cirka?\"\n\nAntal beboere\n– \"Hvor mange personer bor fast i husstanden?\"\n\nOpvarmningstype\n– \"Hvad opvarmes boligen med? (fjernvarme, gas, olie, el eller varmepumpe)\"\n\nStørre el-apparater\n– \"Har I tørretumbler, el-vandvarmer, ekstra fryser, pool/spa eller aircondition?\"\n\nFremtidige ændringer\n– \"Planlægger I elbil eller varmepumpe inden for de næste par år?\"",
    timestamp: 80000 // Appears at 8 seconds
  },
  {
    id: 2,
    question: "Hvordan beregner jeg kundens årlige forbrug ud fra de informationer?",
    answer: "Bolig + antal beboere → giver baseline:\n\nvoksen ≈ 800–1.200 kWh/år\nekstra voksen ≈ 700–1.000 kWh/år\nbørn ≈ 400–800 kWh/år\nboligbasis (standby, køl/frys, router) ≈ 500–900 kWh/år\n\nOpvarmningstype → afgør om elforbruget er lavt (fjernvarme/gas) eller højt (elvarme/varmepumpe).\n\nApparater → læg tillæg på:\n\ntørretumbler +300 kWh\nel-vandvarmer +1.200 kWh\nekstra fryser +200 kWh\npool/spa +700 kWh\nAC +300 kWh\n\nElbil → typisk +2.000–3.000 kWh/år ved 12–18.000 km.\n\nVarmepumpe → kan enten tilføje (hvis ny) eller reducere (hvis erstatter elvarme). Parcelhus typisk 2.500–5.000 kWh/år.\n\nPå baggrund af 4 personer i et parcelhus på 140 m² med fjernvarme, tørretumbler og ekstra fryser, estimerer vi jeres nuværende forbrug til cirka 3.700 kWh/år (±15 %).\nHvis I får en elbil med 15.000 km/år, skal der lægges ca. 2.500 kWh/år til, så det samlede fremtidige forbrug lander på omkring 6.200 kWh/år.",
    timestamp: 81000 // Appears at 8 seconds
  },
  {
    id: 3,
    question: "Hvilke informationer skal jeg bruge for at beregne, hvornår en investering i et solcelleanlæg er tjent hjem, og hvordan kan jeg beregne det?",
    answer: "1. Investeringsomkostning\n- Pris på solcelleanlægget (inkl. installation og evt. finansiering).\n\n2. Kundens årlige elforbrug\n- Hvor meget strøm kunden bruger på et år (kWh).\n\n3. Elpris\n- Aktuel elpris (kr./kWh) – gerne både spotpris og forventet gennemsnitspris.\n\n4. Anlæggets forventede årlige produktion\n- Afhænger af anlæggets størrelse (kWp), geografisk placering og soltimer.\n\n5. Egenforbrug vs. salg til elnettet\n- Hvor stor en andel af den producerede strøm kunden selv kan bruge direkte.\n- Hvor stor en andel sælges tilbage til nettet (til lavere pris).\n\n6. Tilskud eller afgifter\n- Offentlige støtteordninger, tilskud, nettomålerordning eller skatter.\n\n7. Vedligeholdelsesomkostninger\n- Typisk lave, men bør medregnes (f.eks. rengøring, service).",
    timestamp: 179000 // Appears at 8 seconds
  },
])

const generateAnswer = (question) => {
  // Find the answer from the questionButtons array
  const questionData = questionButtons.value.find(btn => btn.question === question)
  if (questionData) {
    return questionData.answer
  }
  
  // Fallback default answer
  return "Dette er et interessant spørgsmål. Lad mig hjælpe dig med at finde det bedste svar baseret på dine behov."
}

const handleGenerateQuestion = (question) => {
  // Add the clicked question to the clickedButtons array
  clickedButtons.value.push(question)
  
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
        <QuestionBtn 
          v-for="btn in questionButtons.filter(btn => !clickedButtons.includes(btn.question))" 
          :key="btn.id"
          :question="btn.question"
          :timestamp="btn.timestamp"
          :elapsed-ms="elapsedMs"
          :is-recording="isRecording"
          @generateQuestion="handleGenerateQuestion" 
        />
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
