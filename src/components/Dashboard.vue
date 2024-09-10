<script setup>
import { defineAsyncComponent, ref, computed } from "vue";
import SASSCONSTANTS from "@/assets/_constants.module.scss"; /* Get the SASS Constants to use it in Javascript */
const DashboardHeader = defineAsyncComponent(() =>
  import("./DashboardHeader.vue")
);
const DashboardOverview = defineAsyncComponent(() =>
  import("./DashboardOverview.vue")
);
const DashboardAnalyses = defineAsyncComponent(() =>
  import("./DashboardAnalyses.vue")
);
const DashboardPerimeter = defineAsyncComponent(() =>
  import("./DashboardPerimeter.vue")
);
const ChartBar = defineAsyncComponent(() => import("./ChartBar.vue"));
const ChartDonut = defineAsyncComponent(() => import("./ChartDonut.vue"));

/* Props */
const { data } = defineProps({ data: { type: Object } });

/* Model */
const period = ref("");

/* Computed */
const filteredData = computed(() => {
  if (data && period.value) {
    let filteredData = [];

    // Remove not selected months for all departments
    data.forEach((departmentData) => {
      let newDepartmentData = { ...departmentData }; // used to preserve the full department data structure
      const filteredMonthlyPerformance =
        departmentData.monthlyPerformance.slice(-period.value);
      newDepartmentData.monthlyPerformance = filteredMonthlyPerformance;
      filteredData.push(newDepartmentData);
    });

    return filteredData;
  }
});

/* Data Processing */
const hospitalStats = computed(() => {
  if (filteredData.value) {
    // Create a temporary data store object
    let sum = {
      totalPatients: null,
      totalTreatments: null,
      totalTreatmentsSuccess: null,
      totalHospitalizations: null,
      totalHospitalizationsSuccess: null,
    };

    // Calculte the sum of all departments stats and inject into "sum" object
    filteredData.value.forEach((department) => {
      department.monthlyPerformance.forEach((month) => {
        sum.totalPatients += month.totalPatients;
        sum.totalTreatments += month.totalTreatments;
        sum.totalTreatmentsSuccess += month.totalTreatmentsSuccess;
        sum.totalHospitalizations += month.totalHospitalizations;
        sum.totalHospitalizationsSuccess += month.totalHospitalizationsSuccess;
      });
    });

    return sum;
  }
});

const monthlyHospitalStats = computed(() => {
  if (filteredData.value) {
    // Target the first department to use it as reference for the number of months
    const firstDepartment = filteredData.value[0];

    return firstDepartment.monthlyPerformance.map((month, monthIndex) => {
      // Create a temporary data store object for each month
      const newMonth = {
        month: month["month"],
        year: month.year,
        totalPatients: null,
        totalTreatments: null,
        totalTreatmentsSuccess: null,
        totalHospitalizations: null,
        totalHospitalizationsSuccess: null,
      };

      // Sum the statistics of each department by month to inject them into "newMonth"
      filteredData.value.forEach((department) => {
        newMonth.totalPatients +=
          department.monthlyPerformance[monthIndex].totalPatients;
        newMonth.totalTreatments +=
          department.monthlyPerformance[monthIndex].totalTreatments;
        newMonth.totalTreatmentsSuccess +=
          department.monthlyPerformance[monthIndex].totalTreatmentsSuccess;
        newMonth.totalHospitalizations +=
          department.monthlyPerformance[monthIndex].totalHospitalizations;
        newMonth.totalHospitalizationsSuccess +=
          department.monthlyPerformance[
            monthIndex
          ].totalHospitalizationsSuccess;
      });

      return newMonth;
    });
  }
});

const monthlyHospitalTreatmentsChartFormat = computed(() => {
  /* Format in Charts.js format the monthly hospital treatments and success treatments statistics */

  if (monthlyHospitalStats.value) {
    /* Create an array of hospital treatments in Chart.js format on one year period */
    // One year array creation minus the expected month(s)
    const treatmentsByMonth = new Array(
      12 - monthlyHospitalStats.value.length
    ).fill(null);
    // Addition of the expected month(s)
    monthlyHospitalStats.value.forEach((month) =>
      treatmentsByMonth.push(month.totalTreatments)
    );

    // Create an array of hospital success treatments in Chart.js format on one year period
    // One year array creation minus the expected month(s)
    const treatmentsSuccessByMonth = new Array(
      12 - monthlyHospitalStats.value.length
    ).fill(null);
    // Addition of the expected month(s)
    monthlyHospitalStats.value.forEach((month) =>
      treatmentsSuccessByMonth.push(month.totalTreatmentsSuccess)
    );

    return [
      {
        label: "Treatments",
        backgroundColor: `${SASSCONSTANTS.TekkareColorBlack}`,
        data: treatmentsByMonth,
      },
      {
        label: "Successful treatments",
        backgroundColor: `${SASSCONSTANTS.TekkareColorSuccess}`,
        data: treatmentsSuccessByMonth,
      },
    ];
  }
});

const monthlyHospitalHospitalizationsChartFormat = computed(() => {
  /* Format in Charts.js format the monthly hospital hospitalizations and success hospitalizations statistics */

  if (monthlyHospitalStats.value) {
    /* Create an array of hospital hospitalizations in Chart.js format on one year period */
    // One year array creation minus the expected month(s)
    const hospitalizationsByMonth = new Array(
      12 - monthlyHospitalStats.value.length
    ).fill(null);
    // Addition of the expected month(s)
    monthlyHospitalStats.value.forEach((month) =>
      hospitalizationsByMonth.push(month.totalHospitalizations)
    );

    // Create an array of hospital success hospitalizations in Chart.js format on one year period
    // One year array creation minus the expected month(s)
    const hospitalizationsSuccessByMonth = new Array(
      12 - monthlyHospitalStats.value.length
    ).fill(null);
    // Addition of the expected month(s)
    monthlyHospitalStats.value.forEach((month) =>
      hospitalizationsSuccessByMonth.push(month.totalHospitalizationsSuccess)
    );

    return [
      {
        label: "Treatments",
        backgroundColor: `${SASSCONSTANTS.TekkareColorBlack}`,
        data: hospitalizationsByMonth,
      },
      {
        label: "Successful treatments",
        backgroundColor: `${SASSCONSTANTS.TekkareColorSuccess}`,
        data: hospitalizationsSuccessByMonth,
      },
    ];
  }
});

const departmentsStats = computed(() => {
  if (filteredData.value) {
    return filteredData.value.map((department) => {
      // Create a temporary data store object for each department by perserving the department data structure
      let newDepartment = {
        department: department.department,
        totalPerformance: {
          totalPatients: null,
          totalTreatments: null,
          totalTreatmentsSuccess: null,
          totalHospitalizations: null,
          totalHospitalizationsSuccess: null,
        },
      };

      // Sum the statistics of each department and inject them into "newDepartment"
      department.monthlyPerformance.forEach((month) => {
        newDepartment.totalPerformance.totalPatients += month.totalPatients;
        newDepartment.totalPerformance.totalTreatments += month.totalTreatments;
        newDepartment.totalPerformance.totalTreatmentsSuccess +=
          month.totalTreatmentsSuccess;
        newDepartment.totalPerformance.totalHospitalizations +=
          month.totalHospitalizations;
        newDepartment.totalPerformance.totalHospitalizationsSuccess +=
          month.totalHospitalizationsSuccess;
      });
      return newDepartment;
    });
  }
});
</script>

<template>
  <div class="dashboard">
    <DashboardHeader v-model="period" />
    <main>
      <DashboardOverview :stats="hospitalStats" />
      <DashboardAnalyses title="Treatments">
        <DashboardPerimeter title="Hospital Score Evolution">
          <ChartBar
            :datasets="monthlyHospitalTreatmentsChartFormat"
            aria-label="Bars graphic showing the evolution of the total number of treatments and their successes over the months."
          />
        </DashboardPerimeter>
        <DashboardPerimeter title="Departments Scores">
          <div class="chart-donut-container">
            <ChartDonut
              :value="department.totalPerformance.totalTreatments"
              :valueSuccess="department.totalPerformance.totalTreatmentsSuccess"
              :title="department.department"
              field="treatments"
              v-for="department in departmentsStats"
              :key="department"
              aria-label="Donut graphic showing the score of success treatments for the department"
            />
            <p v-if="!departmentsStats">No Data</p>
          </div>
        </DashboardPerimeter>
      </DashboardAnalyses>
      <DashboardAnalyses title="Hospitalizations">
        <DashboardPerimeter title="Hospital Score Evolution">
          <ChartBar
            :datasets="monthlyHospitalHospitalizationsChartFormat"
            aria-label="Bars graphic showing the evolution of the total number of hospitalizations and their successes over the months."
          />
        </DashboardPerimeter>
        <DashboardPerimeter title="Departments Scores">
          <div class="chart-donut-container">
            <ChartDonut
              :value="department.totalPerformance.totalHospitalizations"
              :valueSuccess="
                department.totalPerformance.totalHospitalizationsSuccess
              "
              :title="department.department"
              field="hospitalizations"
              v-for="department in departmentsStats"
              :key="department"
              aria-label="Donut graphic showing the score of success hospitalizations for the department"
            />
            <p v-if="!departmentsStats">No Data</p>
          </div>
        </DashboardPerimeter>
      </DashboardAnalyses>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/_constants.scss" as *;
.dashboard {
  background-color: #f0f0f8;
  max-width: 1210px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  main {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .chart-donut-container {
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
