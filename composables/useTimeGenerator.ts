export const useTimeSlotGenerator = () => {
  return Array.from(
    { length: 9 },
    (_, i) => new Date(2023, 1, 1, i + 9, 0)
  );
};
