import { transformDate } from './date-transform';

describe('transformDate', () => {
  it('should create an instance with the correct message', () => {
    const date = transformDate('2025-10-27 16:30:00');

    expect(date).toBeInstanceOf(Date);
  });
});
