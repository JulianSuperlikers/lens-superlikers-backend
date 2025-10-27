import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { getMicrositeConfig } from './campaigns.constants';
import { transformDate } from '@shared/utils/date-transform';

jest.mock('@shared/utils/date-transform', () => ({
  transformDate: jest.fn(),
}));

describe('getMicrositeConfig', () => {
  it('should return the correct config for "sz"', () => {
    const mockDate = new Date('2025-09-08T15:07:00Z');
    (transformDate as jest.Mock).mockReturnValue(mockDate);

    const config = getMicrositeConfig('sz');
    expect(config).toBeDefined();
    expect(config.name).toEqual('TENA');
    expect(config.url).toEqual('https://www.circulotena.com.mx/');
    expect(config.uid).toEqual('nickname');

    if (typeof config.properties === 'function') {
      const sampleReceipt: Partial<VeryfiReceipt> = { id: 12345, date: '2025-09-08 15:07:00' };

      const props = config.properties(sampleReceipt as VeryfiReceipt);

      expect(props.ticket).toBe(12345);

      expect(props.secondary_date).toBeInstanceOf(Date);
      expect((props.secondary_date as Date).getTime()).toBe(mockDate.getTime());

      expect(transformDate).toHaveBeenCalledTimes(1);
      expect(transformDate).toHaveBeenCalledWith('2025-09-08 15:07:00');
    }
  });

  it('should return the correct config for "ua"', () => {
    const config = getMicrositeConfig('ua');
    expect(config).toBeDefined();
    expect(config.name).toEqual('SABA');
    expect(config.url).toEqual('https://sabaclub.com.mx/');
    expect(config.uid).toEqual('email');
  });

  it('should return undefined for an invalid campaign ID', () => {
    const config = getMicrositeConfig('nonexistent');
    expect(config).toBeUndefined();
  });
});
