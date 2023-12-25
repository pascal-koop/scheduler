<script setup lang="ts">
interface DateEntry {
  date: Date;
  selectable: boolean;
}

const props = defineProps<{
  selectedDate: Date | null;
  dates: Array<DateEntry>;
}>();

const month = computed(() => {
  return new Intl.DateTimeFormat("de-DE", {
    month: "long",
  } as Intl.DateTimeFormatOptions).format(props.dates[1]?.date);
});

const emits = defineEmits(["dateSelected", "nextTwoWeeks", "previousTwoWeeks"]);

const selectDay = (day: any ) => {
  if (!day.selectable) return
  emits('dateSelected', day.date)
}

</script>

<style></style>

<template>
  <div class="date-picker">
    <h2 class="date-picker-title">Wähle einen Tag</h2>
    <div class="date-picker-buttons">
      <button @click="emits('previousTwoWeeks')">zurück</button>
      <p class="date-picker-month">{{ month }}</p>
      <button @click="emits('nextTwoWeeks')">vorwärts</button>
    </div>
    <div class="date-picker-weekdays">
      <div>Mo</div>
      <div>Di</div>
      <div>Mi</div>
      <div>Do</div>
      <div>Fr</div>
      <div>Sa</div>
      <div>So</div>
    </div>
    <div class="date-picker-date">
      <Date
        v-for="day in props.dates"
        :selectable="day.selectable"
        :selected="day.date.toString() === props.selectedDate?.toString()"
        :date="day.date"
        @click="selectDay(day)"
      />
    </div>
  </div>
</template>
