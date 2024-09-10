<script setup>
import { defineAsyncComponent } from "vue";
const CardKPI = defineAsyncComponent(() => import("./CardKPI.vue"));
const CardKPIScore = defineAsyncComponent(() => import("./CardKPIScore.vue"));

const { stats } = defineProps({
  stats: { type: Object },
});
</script>

<template>
  <section class="overview" aria-labelledby="overview-heading">
    <h3 class="overview__title" id="overview-heading">Overview</h3>
    <div
      class="overview__cards"
      role="region"
      aria-label="General Key Performance Indicators"
    >
      <CardKPI :value="stats?.totalPatients" title="Patients"
        ><img
          src="./icons/iconPersonalInjury.svg"
          alt="Icon of a human with one's arm in a sling"
          role="img"
          height="38"
      /></CardKPI>
      <CardKPIScore
        :value="stats?.totalTreatments"
        :valueSuccess="stats?.totalTreatmentsSuccess"
        title="Treatments"
        ><img
          src="./icons/iconPill.svg"
          alt="Icon of a Pill"
          role="img"
          height="38"
      /></CardKPIScore>
      <CardKPIScore
        :value="stats?.totalHospitalizations"
        :valueSuccess="stats?.totalHospitalizationsSuccess"
        title="Hospitalizations"
        ><img
          src="./icons/iconHomeHealth.svg"
          alt="Icon of a Hospital"
          role="img"
          height="38"
      /></CardKPIScore>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/_constants.scss" as *;

.overview {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media screen and (min-width: $TekkareBreakpointTablet) {
    align-items: flex-start;
  }

  &__title {
    margin-bottom: 5px;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    @media screen and (min-width: $TekkareBreakpointTablet) {
      flex-direction: row;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>
