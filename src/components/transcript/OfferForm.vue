<script setup>
import { ref } from 'vue'
import mikkelDahlProposal from '@/assets/mikkel-dahl-proposal.pdf'

const emit = defineEmits(['close'])

const formData = ref({
  oprettetAf: 'Anders Kyed Simonsen',
  telefonummer: '22473389',
  email: 'anders6479@gmail.com',
  kunde: 'Mikkel Janus Dahl',
  adresse: 'Præstebro 8, Ringe',
  tilbudsnummer: '7032005',
  kundensForbrug: '6000kW årligt',
  systemstorrelse: '6.12 kWp',
  batteristorrelse: '15.36 kWh',
  tilbagebetaling: '5 år og 3 måneder',
  samletSystempris: '82.216 kr.'
})

function handleSubmit() {
  console.log('Offer form submitted:', formData.value)
  downloadPDF()
}

function downloadPDF() {
  // Create a link element to trigger the download
  const link = document.createElement('a')
  link.href = mikkelDahlProposal
  link.download = 'mikkel-dahl-proposal.pdf'
  link.target = '_blank'
  
  // Append to body, click, and remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="offer-form">
    <div class="offer-form__header">
      <h2>Generer tilbud</h2>
      <button class="offer-form__close-btn" @click="handleClose">
        <span>&times;</span>
      </button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="offer-form__content">
      <div class="offer-form__row">
        <div class="offer-form__field">
          <label for="oprettetAf">Oprettet af:</label>
          <input 
            id="oprettetAf"
            v-model="formData.oprettetAf"
            type="text"
            required
          />
        </div>
        
        <div class="offer-form__field">
          <label for="telefonummer">Telefonummer:</label>
          <input 
            id="telefonummer"
            v-model="formData.telefonummer"
            type="tel"
            required
          />
        </div>
      </div>

      <div class="offer-form__row">
        <div class="offer-form__field">
          <label for="email">Email:</label>
          <input 
            id="email"
            v-model="formData.email"
            type="email"
            required
          />
        </div>
        
        <div class="offer-form__field">
          <label for="kunde">Kunde:</label>
          <input 
            id="kunde"
            v-model="formData.kunde"
            type="text"
            required
          />
        </div>
      </div>

      <div class="offer-form__field">
        <label for="adresse">Adresse:</label>
        <input 
          id="adresse"
          v-model="formData.adresse"
          type="text"
          required
        />
      </div>

      <div class="offer-form__row">
        <div class="offer-form__field">
          <label for="tilbudsnummer">Tilbudsnummer:</label>
          <input 
            id="tilbudsnummer"
            v-model="formData.tilbudsnummer"
            type="text"
            required
          />
        </div>
        
        <div class="offer-form__field">
          <label for="kundensForbrug">Kundens forbrug:</label>
          <input 
            id="kundensForbrug"
            v-model="formData.kundensForbrug"
            type="text"
            placeholder="f.eks. 4000 kWh/år"
            required
          />
        </div>
      </div>

      <div class="offer-form__row">
        <div class="offer-form__field">
          <label for="systemstorrelse">Systemstørrelse:</label>
          <input 
            id="systemstorrelse"
            v-model="formData.systemstorrelse"
            type="text"
            placeholder="f.eks. 6 kWp"
            required
          />
        </div>
        
        <div class="offer-form__field">
          <label for="batteristorrelse">Batteristørrelse:</label>
          <input 
            id="batteristorrelse"
            v-model="formData.batteristorrelse"
            type="text"
            placeholder="f.eks. 10 kWh"
            required
          />
        </div>
      </div>

      <div class="offer-form__row">
        <div class="offer-form__field">
          <label for="tilbagebetaling">Tilbagebetaling:</label>
          <input 
            id="tilbagebetaling"
            v-model="formData.tilbagebetaling"
            type="text"
            placeholder="f.eks. 8 år"
            required
          />
        </div>
        
        <div class="offer-form__field">
          <label for="samletSystempris">Samlet systempris inkl skat:</label>
          <input 
            id="samletSystempris"
            v-model="formData.samletSystempris"
            type="text"
            placeholder="f.eks. 75.000 kr"
            required
          />
        </div>
      </div>

      <div class="offer-form__actions">
        <button type="submit" class="offer-form__submit-btn">
          Download tilbud
        </button>
        <button type="button" class="offer-form__cancel-btn" @click="handleClose">
          Annuller
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.offer-form {
  background-color: transparent;
  padding: 16px;
  width: 100%;
  height: 100vh;
  color: #ffffff;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #3A3B4F;

    h2 {
      margin: 0;
      color: #ffffff;
      font-size: 20px;
      font-weight: 500;
    }
  }

  &__close-btn {
    background: none;
    border: none;
    color: #6B7280;
    font-size: 18px;
    cursor: pointer;
    padding: 6px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #3A3B4F;
      color: #ffffff;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      color: #B8B9C5;
      font-size: 13px;
      font-weight: 500;
    }

    input {
      background-color: #2D2E40;
      border: 1px solid #3A3B4F;
      border-radius: 6px;
      padding: 10px 12px;
      color: #ffffff;
      font-size: 14px;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: #4A90E2;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
      }

      &::placeholder {
        color: #6B7280;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #3A3B4F;
  }

  &__submit-btn {
    background-color: #4A90E2;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #357ABD;
    }
  }

  &__cancel-btn {
    background-color: transparent;
    color: #9499A5;
    border: 1px solid #3A3B4F;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #3A3B4F;
      color: #ffffff;
    }
  }
}
</style>
