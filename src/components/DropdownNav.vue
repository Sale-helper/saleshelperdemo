<script setup>
import DropdownBtn from '@/components/DropdownBtn.vue'
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div class="dropdown-nav" :class="{ open: isDropdownOpen }">
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

    <div class="dropdown-container" :class="{ 'is-open': isDropdownOpen }">
      <div class="dropdown-content">
        <div class="dropdown-content-inner">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';
.dropdown-nav {
  padding: 16px;
  border-radius: 24px;
  background-color: $background-dropdown;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.dropdown-nav.open {
  height: 100%;
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
  display: grid;
  grid-template-rows: 0fr;
  padding-top: 0;
  transition: grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1), padding-top 220ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.dropdown-container.is-open {
  grid-template-rows: 1fr;
  padding-top: 32px;
  flex: 1;
  pointer-events: auto;
}

.dropdown-content {
  overflow: hidden;
}

.dropdown-content-inner {
  display: flex;
  flex-direction: column;
  gap: 32px;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
  height: 100%;
}

.dropdown-container.is-open .dropdown-content-inner {
  opacity: 1;
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
