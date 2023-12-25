<script setup lang="ts">
onMounted(() => {
  useScrollToElement(target.value);
});

const target = ref(null);

const props = defineProps<{
  selectedTimeSlot: Date | null;
  timeSlots: Array<Date>;
}>();

const emits = defineEmits(['timeSlotSelected']);
</script>

<style></style>

<template>
  <div
    ref="target"
    class="time-slots">
    <div class="time-slots-inner">
      <h2 class="time-slots-title">Wähle eine Uhrzeit</h2>
      <TimeSlot
        v-for="timeSlot in props.timeSlots"
        :time="timeSlot"
        :selected="props.selectedTimeSlot?.toString() === timeSlot.toString()"
        @click="emits('timeSlotSelected', timeSlot)" />
    </div>
  </div>
</template>
