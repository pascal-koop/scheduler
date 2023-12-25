<script setup lang="ts">
const props = defineProps({
  time: Date,
  selected: Boolean,
});

const selectedClass = computed(() => {
 return props.selected ? 'active' : '';
});
</script>

<style></style>

<template>
  <div class="time-slot-content" :class="selectedClass">
    <p>
      {{ props.time?.getHours() }}:{{ props.time?.getMinutes() }}0 Uhr
    </p>
  </div>
</template>
