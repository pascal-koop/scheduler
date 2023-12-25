import { describe, it, expect } from 'vitest';
import { useCalenderIntervalGenerator } from '../composables/useCalenderIntervalGenerator';
import { useTimeStringConverter } from './helpers/useTimeStringConverter';

const currentDate = new Date();
let calenderOf14Days = <{ selectable: boolean; date: Date }[]>[];

const nextTwoWeeks = (date: Date) => {
  return new Date(new Date().setDate(date.getDate() + 14));
};

describe('useCalenderGenerator function', () => {
  const currentDateLocalString = currentDate.toLocaleString('de-DE').split(',')[0];
  const twoWeeksLater = nextTwoWeeks(currentDate);
  calenderOf14Days = useCalenderIntervalGenerator(currentDate, 14);

  const convertedDates = useTimeStringConverter(calenderOf14Days);
  const today = convertedDates.find((day) => day.date === currentDateLocalString);

  const actualDay = twoWeeksLater.getDate();
  const expectedDay = new Date(currentDate.setDate(currentDate.getDate() + 14));

  it('should be 14 days later from now', () => {
    expect(actualDay).toBe(expectedDay.getDate());
  });
  it('today should not be selectable', () => {
    expect(today?.selectable).toBeFalsy();
  });

  const MONDAY = 1;
  const SUNDAY = 0;

  it('interval starts on monday', () => {
    expect(calenderOf14Days[0].date.getDay()).toBe(MONDAY);
  });

  it('interval ends on sunday', () => {
    expect(calenderOf14Days[calenderOf14Days.length - 1].date.getDay()).toBe(SUNDAY);
  });

  it('sundays and saturdays in the 14 days interval are not selectable', () => {
    expect(calenderOf14Days[5].selectable && calenderOf14Days[6].selectable).toBeFalsy();
    expect(calenderOf14Days[12].selectable && calenderOf14Days[13].selectable).toBeFalsy();
  });

  it('date is type of Date', () => {
    expect(calenderOf14Days[0]['date']).toBeInstanceOf(Date);
  });

  const intervallWithoutSecondParameter = useCalenderIntervalGenerator(new Date());
  it('should be the default interval length of 14', () => {
    expect(intervallWithoutSecondParameter.length).toBe(14);
  });

  const random = Math.floor(Math.random() * 100);
  const randomInterval = useCalenderIntervalGenerator(new Date(), random);

  it('should be random days long', () => {
    expect(randomInterval.length).toBe(random);
  });
});
