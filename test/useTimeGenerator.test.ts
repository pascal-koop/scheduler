import { describe, it, expect } from 'vitest';
import { useTimeSlotGenerator } from '../composables/useTimeGenerator';

const nineOClock = 9;
const seventeenOClock = 17;
describe('generate time slots', () => {
  const timeSlot = useTimeSlotGenerator();
  it('should be 9 time slots long', () => {
    expect(timeSlot.length === 9).toBeTruthy();
  });

  it('the first time slot should be 9:00', () => {
    expect(timeSlot[0].getHours()).toBe(nineOClock);
  });

  it('the last time slot should be 17:00', () => {
    expect(timeSlot[timeSlot.length - 1].getHours()).toBe(seventeenOClock);
  });
});
