<script setup>
import { defineAsyncComponent, ref, watchEffect } from "vue";
import { getData } from "@/composables/fetcher";
const Dashboard = defineAsyncComponent(() =>
  import("./components/Dashboard.vue")
);

/* Data Fetching App */
const data = ref(undefined);

// Use watchEffect to fetch the Data in accordance with the Vue Official documentation and to start the fetching during component setup
watchEffect(async () => {
  const fetchedData = await getData();
  data.value = fetchedData?.departmentsMonthlyPerformance; // Points specifically to statistics data
});
</script>

<template><Dashboard :data /></template>
