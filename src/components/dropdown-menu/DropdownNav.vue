<script setup>
import DropdownBtn from '@/components/dropdown-menu/DropdownBtn.vue'
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div class="dropdown-nav" :class="{ 'dropdown-nav--open': isDropdownOpen }">
    <div class="dropdown-nav__profile" @click="toggleDropdown">
      <div class="dropdown-nav__profile-wrap">
        <div class="dropdown-nav__profile-image">
          <img src="" alt="user profile image" />
        </div>
        <div>
          <h3>Anders Simonsen</h3>
          <h1>Solcelle gruppen</h1>
        </div>
      </div>

      <div>
        <img
          class="dropdown-nav__arrow"
          :class="{ 'dropdown-nav__arrow--rotated': isDropdownOpen }"
          src="@/assets/icons/dropdown-arrow.svg"
          alt="dropdown arrow"
        />
      </div>
    </div>

    <div class="dropdown-nav__container" :class="{ 'dropdown-nav__container--open': isDropdownOpen }">
      <div class="dropdown-nav__content">
        <div class="dropdown-nav__content-inner">
          <div class="dropdown-nav__top">
            <div class="dropdown-nav__section">
              <div class="dropdown-nav__heading">
                <h1>Kampagne</h1>
                <div class="dropdown-nav__heading-line"></div>
              </div>

              <DropdownBtn
                selectedText="Solcelle Gruppen"
                :unselectedOptions="['Waow Fiber', 'Visa Cashback']"
              />
            </div>

            <div class="dropdown-nav__section">
              <div class="dropdown-nav__heading">
                <h1>Arkiv</h1>
                <div class="dropdown-nav__heading-line"></div>
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
          <div class="dropdown-nav__bottom">
            <div class="dropdown-nav__logout-button">
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
  position:absolute;
  width: -webkit-fill-available;
  padding: 16px;
  margin: 16px;
  border-radius: 24px;
  background-color: $background-dropdown;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &--open {
    height: -webkit-fill-available;
  }

  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__profile-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__profile-image {
    width: 50px;
    height: 50px;
    background-color: aqua;

    img {
      width: 50px;
      height: 50px;
    }
  }

  &__arrow {
    width: 24px;
    transition: transform 0.3s ease;

    &--rotated {
      transform: rotate(180deg);
    }
  }

  &__container {
    display: grid;
    grid-template-rows: 0fr;
    padding-top: 0;
    transition: grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1),
      padding-top 220ms cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;

    &--open {
      grid-template-rows: 1fr;
      padding-top: 32px;
      flex: 1;
      pointer-events: auto;
    }
  }

  &__content {
    overflow: hidden;
  }

  &__content-inner {
    display: flex;
    flex-direction: column;
    gap: 32px;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    height: 100%;
  }

  &__container--open &__content-inner {
    opacity: 1;
    transform: translateY(0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__top {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__heading {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__heading-line {
    width: 100%;
    height: 1px;
    background-color: $text-gray;
  }

  &__logout-button {
    background-color: $background-primary;
    padding: 16px;
    border-radius: 24px;
  }
}
</style>
