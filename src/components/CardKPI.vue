<script setup>
const { value, title } = defineProps({
  value: { type: [Number, String], default: "--" },
  title: { type: String, required: true },
});
</script>

<template>
  <div class="card-kpi card">
    <div class="kpi" aria-labelledby="kpi-title" aria-describedby="kpi-value">
      <div class="kpi__image">
        <slot />
      </div>
      <p class="kpi__value-container">
        <span class="kpi__value" id="kpi-value">{{ value }}</span>
        <span class="kpi__title" id="kpi-title">{{ title }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/_constants.scss" as *;

.kpi {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  &__value-container {
    display: flex;
    flex-direction: column;
  }
  &__value {
    font-size: 1.4375rem;
  }
  &__title {
    font-size: 0.875rem;
  }
}
</style>
