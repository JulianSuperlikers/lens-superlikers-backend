import { VeryfiReceipt } from '@core/interfaces/veryfi.interfaces';
import { getMicrositeConfig } from './campaigns.constants';

describe('getMicrositeConfig', () => {
  it('should return the correct config for "sz"', () => {
    const config = getMicrositeConfig('sz');
    expect(config).toBeDefined();
    expect(config.name).toEqual('TENA');
    expect(config.url).toEqual('https://www.circulotena.com.mx/');
    expect(config.uid).toEqual('nickname');

    if (typeof config.properties === 'function') {
      const sampleReceipt: Partial<VeryfiReceipt> = { id: 12345 };

      const props = config.properties(sampleReceipt as VeryfiReceipt);
      expect(props).toEqual({ ticket: 12345 });
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
