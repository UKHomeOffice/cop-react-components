import { getTemplates } from './MultiSelectAutocomplete.utils';

describe('Autocomplete', () => {
  describe('utils', () => {
    describe('getTemplates', () => {
      const checkValidTemplates = (templates) => {
        expect(templates).not.toBeNull();
        expect(templates.inputValue).toBeInstanceOf(Function);
        expect(templates.suggestion).toBeInstanceOf(Function);

      };
      it('should simply return existing valid templates', () => {
        const EXISTING_TEMPLATES = {
          inputValue: (item) => item || '',
          suggestion: (item) => item || ''
        };
        const RESULT = getTemplates(EXISTING_TEMPLATES, undefined);
        expect(RESULT).toEqual(EXISTING_TEMPLATES);
      });
      it('should default to returning the entire item when there is no structure', () => {
        const RESULT = getTemplates(undefined, undefined);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('bob');
        expect(RESULT.suggestion('jane')).toEqual('jane');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual({ name: 'bob' });
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual({ forename: 'Mary', surname: 'Sue' });
      });
      it('should return the appropriate value, based on the structure', () => {
        const STRUCTURE = { label: 'name' };
        const RESULT = getTemplates(undefined, STRUCTURE);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('');
        expect(RESULT.suggestion('jane')).toEqual('');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual('bob');
        expect(RESULT.suggestion({ name: 'jane' })).toEqual('jane');
        expect(RESULT.inputValue({ forename: 'Mary', surname: 'Sue' })).toEqual('');
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual('');
      });
      it('should return the appropriate value, based on the structure format', () => {
        // eslint-disable-next-line no-template-curly-in-string
        const STRUCTURE = { format: '${forename} ${surname}' };
        const RESULT = getTemplates(undefined, STRUCTURE);
        checkValidTemplates(RESULT);
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('');
        expect(RESULT.suggestion('jane')).toEqual('');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual('');
        expect(RESULT.suggestion({ name: 'jane' })).toEqual('');
        expect(RESULT.inputValue({ forename: 'Mary', surname: 'Sue' })).toEqual('Mary Sue');
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual('Mary Sue');
      });
      it('should handle an incomplete templates parameter', () => {
        const INVALID_TEMPLATES = {
          inputValue: undefined,
          suggestion: (item) => item || ''
        };
        const RESULT = getTemplates(INVALID_TEMPLATES, undefined);
        checkValidTemplates(RESULT);
        expect(RESULT.suggestion).toEqual(INVALID_TEMPLATES.suggestion);
        expect(RESULT.inputValue).toEqual(INVALID_TEMPLATES.suggestion); // Mirrored
        expect(RESULT.inputValue(undefined)).toEqual('');
        expect(RESULT.inputValue('bob')).toEqual('bob');
        expect(RESULT.suggestion('jane')).toEqual('jane');
        expect(RESULT.inputValue({ name: 'bob' })).toEqual({ name: 'bob' });
        expect(RESULT.suggestion({ forename: 'Mary', surname: 'Sue' })).toEqual({ forename: 'Mary', surname: 'Sue' });
      });
    });
  });
});
