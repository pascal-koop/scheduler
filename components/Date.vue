<script setup lang="ts">
const props = defineProps({
  selected: Boolean,
  selectable: Boolean,
  date: Date,
});

const dayClass = computed(() => {
  if (props.selected && props.selectable) {
    return 'active';
  } else if (!props.selectable) {
    return 'disabled';
  } else {
    return '';
  }
});
</script>

<style></style>

<template>
  <div class="day" :class="dayClass">
    <p>{{ props.date?.getDate() }}</p>
  </div>
</template>
