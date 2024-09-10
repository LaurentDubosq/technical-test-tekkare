<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";

const { value, valueSuccess, title, field } = defineProps({
  value: { type: [String, Number], default: "--" },
  valueSuccess: { type: [String, Number], default: "--" },
  title: { type: String, default: "--" },
  field: { type: String, required: true },
});

const score = computed(() => {
  if (value & valueSuccess) {
    return Math.round((valueSuccess / value) * 100);
  } else {
    return "--";
  }
});

// Get the data from the 'department' prop to build the expected data at the Chart.js format
const data = computed(() => {
  return {
    datasets: [
      {
        backgroundColor: ["#5de2a0", "black"],
        data: [score.value, 100 - score.value],
      },
    ],
  };
});

ChartJS.register(ArcElement, Tooltip, Legend);
</script>

<template>
  <div class="chart-donut card">
    <h5>{{ title }}</h5>
    <div class="chart-donut__inner-container">
      <div class="chart-donut__canvas">
        <Doughnut
          :data="data"
          :options="{
            responsive: true,
            maintainAspectRatio: false,
          }"
        />
      </div>
      <div
        class="chart-donut__score-container"
        :aria-label="`${title} ${field} performance score`"
        aria-describedby="kpi-value"
      >
        <span class="chart-donut__score" id="kpi-value">{{ score }}%</span
        ><br /><span class="chart-donut__score-text"
          >({{ valueSuccess }} {{ field }})</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/constants" as *;

.chart-donut {
  h5 {
    text-align: center;
  }

  &__canvas {
    width: 150px;
    height: 150px;
    @media screen and (min-width: $TekkareBreakpointTablet) {
      width: 160px;
      height: 160px;
    }
  }

  &__inner-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (min-width: $TekkareBreakpointTablet) {
      gap: 20px;
    }
  }

  &__score-container {
    color: $TekkareColorSuccess;
    text-align: center;
  }

  &__score {
    font-size: 2.3125rem;
    @media screen and (min-width: $TekkareBreakpointTablet) {
      font-size: 2.875rem;
    }
  }
}
</style>
