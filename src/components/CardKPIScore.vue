<script setup>
import { computed } from "vue";

const { value, valueSuccess, title } = defineProps({
  value: { type: [Number, String], default: "--" },
  valueSuccess: { type: [Number, String], default: "--" },
  title: { type: String, required: true },
});

const score = computed(() => {
  if (value & valueSuccess) {
    return Math.round((valueSuccess / value) * 100);
  } else {
    return "--";
  }
});
</script>

<template>
  <div class="card-kpi-score card">
    <div class="kpi" aria-labelledby="kpi-title" aria-describedby="kpi-value">
      <div class="kpi__image">
        <slot />
      </div>
      <p class="kpi__value-container">
        <span class="kpi__value" id="kpi-value">{{ value }}</span>
        <span class="kpi__title" id="kpi-title">{{ title }}</span>
      </p>
    </div>
    <div
      class="kpi kpi--success"
      aria-labelledby="kpi-title-success"
      aria-describedby="kpi-value-success"
    >
      <div class="kpi__image">
        <img
          src="./icons/iconCheckCircle.svg"
          alt="Icon in green of a circle checked"
          role="img"
          height="38"
        />
      </div>
      <p class="kpi__value-container">
        <span class="kpi__value" id="kpi-value-success">{{
          valueSuccess
        }}</span>
        <span class="kpi__title" id="kpi-title-success">Successful</span>
      </p>
    </div>
    <div
      class="kpi kpi-score kpi--success"
      aria-label="kpi performance score"
      aria-describedby="kpi-value"
    >
      <span id="kpi-value">{{ score }}%</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/_constants.scss" as *;

.card-kpi-score {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  row-gap: 10px;
}

.kpi {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 15px;

  &--success {
    color: $TekkareColorSuccess;
  }

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

  &-score {
    font-size: 3rem;
    line-height: 3rem;
  }
}
</style>
