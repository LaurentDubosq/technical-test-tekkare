<script setup>
const model = defineModel();
</script>

<template>
  <header class="header">
    <div class="header__titles">
      <h1>Saint-Jean Hospital</h1>
      <h2>Treatments & Hospitalisations Performance</h2>
    </div>
    <div class="select-wrapper">
      <label for="periods" class="sr-only">Choose a period:</label>
      <select name="periods" id="periods" v-model="model">
        <option value="">Please choose an option</option>
        <option value="1">last month</option>
        <option value="3">last 3 months</option>
        <option value="6">last 6 months</option>
        <option value="12">last 12 months</option>
      </select>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "@/assets/_constants.scss" as *;

.header {
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media screen and (min-width: $TekkareBreakpointTablet) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
