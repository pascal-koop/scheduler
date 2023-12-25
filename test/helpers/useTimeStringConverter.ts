export const useTimeStringConverter = (dates: { selectable: boolean; date: Date }[]) => {
  const convertedDates: { selectable: boolean; date: string }[] = [];

  dates.forEach((element) => {
    convertedDates.push({
      selectable: element.selectable,
      date: element.date.toLocaleString('de-DE').split(',')[0],
    });
  });

  return convertedDates;
};
