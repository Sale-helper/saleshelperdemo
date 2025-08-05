<script setup>
import DropdownBtn from '@/components/DropdownBtn.vue'
</script>

<template>
  <div class="dropdown-nav">
    <div class="profile-container">
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
        <img class="dropdown-arrow" src="@/assets/icons/dropdown-arrow.svg" alt="dropdown arrow" />
      </div>
    </div>

    <div class="dropdown-container">
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
}

.profile-container {
  display: flex;
  justify-content: space-between;
}

.profile-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dropdown-arrow {
  width: 24px;
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
</style>
