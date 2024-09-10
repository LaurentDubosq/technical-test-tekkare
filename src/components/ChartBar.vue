<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { computed } from "vue";
import { Bar } from "vue-chartjs";

const { datasets } = defineProps({
  datasets: {
    type: Object,
    default: [
      {
        label: "",
        backgroundColor: "rgba(0, 0, 0, 0)",
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      },
    ],
  },
});

// Get the data from the 'datasets' prop to nest it inside the Chart.js data object
const data = computed(() => {
  return {
    labels: [
      "September",
      "October",
      "November",
      "December",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    datasets: datasets,
  };
});

// Components necessary to Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
</script>

<template>
  <div class="chart-bar card">
    <Bar
      :data="data"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/constants" as *;

.chart-bar {
  height: 200px;
  @media screen and (min-width: $TekkareBreakpointTablet) {
    height: 370px;
  }
}
</style>
