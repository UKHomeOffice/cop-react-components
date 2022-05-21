import { Colours, ColoursAsRefData } from './Colours-sb';

describe('Colours-sb', () => {
  it('should export arrays appropriately', () => {
    expect(Array.isArray(Colours)).toBeTruthy();
    expect(Array.isArray(ColoursAsRefData)).toBeTruthy();
  });
});
