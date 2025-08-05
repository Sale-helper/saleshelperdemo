<script setup>
import DropdownBtn from '@/components/DropdownBtn.vue'
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div class="dropdown-nav">
    <div class="profile-container" @click="toggleDropdown">
      <div class="profile-wrap">
        <div class="profile-container-image">
          <img src="" alt="user profile image" />
        </div>
        <div>
          <h3>Anders Simonsen</h3>
          <h1>Solcelle gruppen</h1>
        </div>
      </div>

      <div>
        <img 
          class="dropdown-arrow" 
          :class="{ 'rotated': isDropdownOpen }"
          src="@/assets/icons/dropdown-arrow.svg" 
          alt="dropdown arrow" 
        />
      </div>
    </div>

    <div class="dropdown-container" :class="{ 'hidden': !isDropdownOpen }">
      <div class="dropdown-top">
        <div class="dropdown-section">
          <div class="dropdown-heading">
            <h1>Kampagne</h1>
            <div class="heading-line"></div>
          </div>

          <DropdownBtn
            selectedText="Solcelle Gruppen"
            :unselectedOptions="['Waow Fiber', 'Visa Cashback']"
          />
        </div>

        <div class="dropdown-section">
          <div class="dropdown-heading">
            <h1>Arkiv</h1>
            <div class="heading-line"></div>
          </div>

          <DropdownBtn
            selectedText="07/29/2025, 10:34 - 10:50"
            :unselectedOptions="['Åben transcript', 'Slet transcript']"
          />
          <DropdownBtn
            selectedText="07/29/2025, 10:02 - 10:23"
            :unselectedOptions="['Åben transcript', 'Slet transcript']"
          />
          <DropdownBtn
            selectedText="07/29/2025, 09:43 - 09:58"
            :unselectedOptions="['Åben transcript', 'Slet transcript']"
          />
        </div>
      </div>
      <div class="dropdown-bottom">
        <div class="btn-main">
            <h2>Log ud</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';
.dropdown-nav {
  padding: 16px;
  border-radius: 24px;
  background-color: $background-dropdown;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.profile-container {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.profile-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-arrow {
  width: 24px;
  transition: transform 0.3s ease;
  
  &.rotated {
    transform: rotate(180deg);
  }
}

.profile-container-image {
  width: 50px;
  height: 50px;
  background-color: aqua;
}

img {
  width: 50px;
  height: 50px;
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 32px;
  flex: 1;
  box-sizing: border-box;
  justify-content: space-between;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &.hidden {
    padding-top: 0;
    gap: 0;
    flex: 0;
    height: 0;
    opacity: 0;
  }
}

.dropdown-top {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.dropdown-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dropdown-heading {
  display: flex;
  align-items: center;
  gap: 12px;
}

.heading-line {
  width: 100%;
  height: 1px;
  background-color: $text-gray;
}

.btn-main {
    background-color: $background-primary;
    padding: 16px;
    border-radius: 24px;
}
</style>
