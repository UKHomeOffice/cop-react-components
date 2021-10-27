import { classBuilder, interpolateString, toArray } from './Utils';

describe('Utils', () => {

  describe('toArray', () => {
    
    it('should handle a string input', () => {
      const INPUT = 'text';
      const RESULT = toArray(INPUT);
      expect(RESULT).toHaveLength(1);
      expect(RESULT[0]).toEqual(INPUT);
    });

    it('should handle a numeric input', () => {
      const INPUT = 15;
      const RESULT = toArray(INPUT);
      expect(RESULT).toHaveLength(1);
      expect(RESULT[0]).toEqual(INPUT);
    });

    it('should handle an object input', () => {
      const INPUT = { prop: 'value' };
      const RESULT = toArray(INPUT);
      expect(RESULT).toHaveLength(1);
      expect(RESULT[0]).toEqual(INPUT);
    });

    it('should handle an undefined input', () => {
      const RESULT = toArray(undefined);
      expect(RESULT).toBeUndefined();
    });

    it('should handle no input parameter', () => {
      const RESULT = toArray();
      expect(RESULT).toBeUndefined();
    });

    it('should handle a null input', () => {
      const RESULT = toArray(null);
      expect(RESULT).toBeNull();
    });

    it('should handle an array input', () => {
      const INPUT = ['a', 'b', 'c'];
      const RESULT = toArray(INPUT);
      expect(RESULT).toEqual(INPUT);
    });

  });

  describe('classBuilder', () => {
    
    describe('without block modifiers or extras', () => {
      const BLOCK = 'block';
      let cb;
      beforeEach(() => {
        cb = classBuilder(BLOCK);
      });

      it('should correctly return the block', () => {
        expect(cb()).toEqual(BLOCK);
      });
  
      it('should handle an element parameter', () => {
        expect(cb('text')).toEqual(`${BLOCK}__text`);
      });
  
      it('should handle an element parameter and a string modifier', () => {
        expect(cb('thing', 'modifier')).toEqual(`${BLOCK}__thing ${BLOCK}__thing--modifier`);
      });
  
      it('should handle an element parameter and an array of modifiers', () => {
        expect(cb('thing', ['x', 'y'])).toEqual(`${BLOCK}__thing ${BLOCK}__thing--x ${BLOCK}__thing--y`);
      });
  
      it('should handle an element parameter and an array of modifiers with an extra', () => {
        expect(cb('thing', ['x', 'y'], 'blob')).toEqual(`${BLOCK}__thing ${BLOCK}__thing--x ${BLOCK}__thing--y blob`);
      });
    });
    
    describe('with string block modifier', () => {
      const BLOCK = 'block';
      const MODIFIER = 'modifier';
      let cb;
      beforeEach(() => {
        cb = classBuilder(BLOCK, MODIFIER);
      });

      it('should correctly return the block', () => {
        expect(cb()).toEqual(`${BLOCK} ${BLOCK}--${MODIFIER}`);
      });
  
      it('should still handle an element parameter', () => {
        expect(cb('text')).toEqual(`${BLOCK}__text`);
      });
  
      it('should still handle an element parameter and a string modifier', () => {
        expect(cb('thing', 'modifier')).toEqual(`${BLOCK}__thing ${BLOCK}__thing--modifier`);
      });
  
      it('should still handle an element parameter and an array of modifiers', () => {
        expect(cb('thing', ['x', 'y'])).toEqual(`${BLOCK}__thing ${BLOCK}__thing--x ${BLOCK}__thing--y`);
      });
  
      it('should still handle an element parameter and an array of modifiers with an extra', () => {
        expect(cb('thing', ['x', 'y'], 'blob')).toEqual(`${BLOCK}__thing ${BLOCK}__thing--x ${BLOCK}__thing--y blob`);
      });
    });
    
    describe('with array of block modifiers', () => {
      const BLOCK = 'block';
      const MODIFIERS = ['alpha', 'bravo', 'charlie'];
      let cb;
      beforeEach(() => {
        cb = classBuilder(BLOCK, MODIFIERS);
      });

      it('should correctly return the block', () => {
        const ALL_MODIFIERS = MODIFIERS.map(m => `${BLOCK}--${m}`).join(' ');
        expect(cb()).toEqual(`${BLOCK} ${ALL_MODIFIERS}`);
      });
    });
    
    describe('with array of block modifiers and extra', () => {
      const BLOCK = 'block';
      const MODIFIERS = ['alpha', 'bravo', 'charlie'];
      const EXTRA = 'blockExtra'
      let cb;
      beforeEach(() => {
        cb = classBuilder(BLOCK, MODIFIERS, EXTRA);
      });

      it('should correctly return the block', () => {
        const ALL_MODIFIERS = MODIFIERS.map(m => `${BLOCK}--${m}`).join(' ');
        expect(cb()).toEqual(`${BLOCK} ${ALL_MODIFIERS} ${EXTRA}`);
      });
    });

  });

  describe('interpolateString', () => {

    it('should interpolate a nested object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<span>${item.label}</span>';
      const OBJECT = { item: { id: '1', label: 'Item 1' } };
      const RESULT = interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<span>Item 1</span>');
    });

    it('should interpolate multiple properties on the object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'Bob', surname: 'Smith' };
      const RESULT = interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<div>Bob Smith</div>');
    });

    it('should fallback on missing properties on the object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'William' };
      const FALLBACK = 'Fallback-Jones';
      const RESULT = interpolateString(TEMPLATE, OBJECT, FALLBACK);
      expect(RESULT).toEqual('<div>William Fallback-Jones</div>');
    });

    it('should default fallback to an empty string', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const OBJECT = { forename: 'David' };
      const RESULT = interpolateString(TEMPLATE, OBJECT);
      expect(RESULT).toEqual('<div>David </div>');
    });

    it('should handle an undefined template', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const OBJECT = { forename: 'David' };
      const RESULT = interpolateString(undefined, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle a null template', () => {
      const OBJECT = { forename: 'David' };
      const RESULT = interpolateString(null, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle a non-string template', () => {
      const OBJECT = { forename: 'David' };
      const RESULT = interpolateString(3, OBJECT);
      expect(RESULT).toEqual('');
    });

    it('should handle an undefined object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const RESULT = interpolateString(TEMPLATE, undefined);
      expect(RESULT).toEqual('<div> </div>');
    });

    it('should handle an undefined object with a fallback', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const FALLBACK = 'Hello';
      const RESULT = interpolateString(TEMPLATE, undefined, FALLBACK);
      expect(RESULT).toEqual('<div>Hello Hello</div>');
    });

    it('should handle a null object', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const RESULT = interpolateString(TEMPLATE, null);
      expect(RESULT).toEqual('<div> </div>');
    });

    it('should handle a null object with a fallback', () => {
      // eslint-disable-next-line no-template-curly-in-string
      const TEMPLATE = '<div>${forename} ${surname}</div>';
      const FALLBACK = 'Hello';
      const RESULT = interpolateString(TEMPLATE, null, FALLBACK);
      expect(RESULT).toEqual('<div>Hello Hello</div>');
    });

  });

});
