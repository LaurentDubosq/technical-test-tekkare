<script setup>
const { title } = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="perimeter" aria-labelledby="perimeter-heading" role="region">
    <h4 class="perimeter__title" id="perimeter-heading">{{ title }}</h4>
    <slot />
  </section>
</template>

<style scoped lang="scss">
.perimeter__title {
  margin-bottom: 5px;
}
</style>
