<script setup>
const { title } = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="analyses" :aria-labelledby="`${title}-heading`">
    <h3 :id="`${title}-heading`">{{ title }} Performance</h3>
    <div class="analyses__perimeters">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.analyses {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &__perimeters {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
}
</style>
