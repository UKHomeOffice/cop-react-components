import { Countries, CountriesAsRefData } from './Countries-sb';

describe('Countries-sb', () => {
  it('should export arrays appropriately', () => {
    expect(Array.isArray(Countries)).toBeTruthy();
    expect(Array.isArray(CountriesAsRefData)).toBeTruthy();
  });
});
