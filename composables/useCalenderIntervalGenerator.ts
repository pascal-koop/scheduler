export const useCalenderIntervalGenerator = (referenceDate: Date, intervalLength: number = 14) => {
  // berechnet die Wochentage die vor dem aktuellen Tag liegen(falls der aktuelle Tag z.B. mitten in der Woche liegt)
  const startOfInterval = new Date(referenceDate);
  startOfInterval.setDate(
    startOfInterval.getDate() - startOfInterval.getDay() + 1 // +1 to start the list on a monday
  );

  const SATURDAY = 6;
  const SUNDAY = 0;
  const TODAY = new Date();
  const calender = [];
  for (let day = 0; day < intervalLength; day++) {
    const date = new Date(startOfInterval);
    date.setDate(date.getDate() + day);
    const weekDay = date.getDay();
    let selectable = true;

    if (weekDay === SUNDAY || weekDay === SATURDAY || date <= TODAY) {
      selectable = false;
    }

    calender.push({
      selectable: selectable,
      date: date,
    });
  }
  return calender;
};
