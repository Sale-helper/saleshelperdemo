<script setup></script>

<template>
  <div class="transcript">
    <div class="transcript__heading">
      <h1>Transcript</h1>
      <div class="transcript__heading-line"></div>
    </div>
    <div class="transcript__text">
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
      <div class="transcript__person">
        <h3>Anders</h3>
        <p>
          Hej, du snakker med Anders Simonsen inde fra Solcellen gruppen. Er det Kristoffer Madsen,
          jeg har fået fat i?
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/main.scss';

.transcript {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-height: 0;
    padding-bottom: 24px;

  &__heading {
    display: flex;
    align-items: center;
    gap: 12px;
    color: $text-purple;
  }

  &__heading-line {
    width: 100%;
    height: 1px;
    background-color: $text-purple;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    // Hide scrollbar while allowing scroll
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox

    &::-webkit-scrollbar { // Chrome, Safari, Opera
      width: 0;
      height: 0;
    }
  }
}
</style>
