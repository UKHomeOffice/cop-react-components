// Global imports
import { fireEvent, getByTestId, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import React from 'react';

// Local imports
import { DEFAULT_CLASS as DEFAULT_READONLY_CLASS } from '../Readonly';
import FileUpload, { DEFAULT_CLASS } from './FileUpload';

describe('FileUpload', () => {

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
  });

  const checkSetup = (container, testId) => {
    const wrapper = container.firstChild;
    expect(wrapper.classList).toContain(DEFAULT_CLASS);
    const input = getByTestId(container, testId);
    if (input) {
      expect(input.classList).toContain(`${DEFAULT_CLASS}__select`);
    }
    return { wrapper, input };
  };

  it('should be appropriately set up with id and name', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} />
    );
    const { input } = checkSetup(container, INPUT_ID);
    expect(input.name).toEqual(`${INPUT_FIELD_ID}-select`);
    expect(input.type).toEqual('file');
    expect(input.value).toEqual('');
    expect(input.getAttribute('disabled')).toBeNull();
  });

  it('should accept the disabled flag', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} disabled={true} />
    );
    const { wrapper, input } = checkSetup(container, INPUT_ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}--disabled`);
    expect(input.getAttribute('disabled')).not.toBeNull();
  });

  it('should accept the readonly flag for an image', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = {
      name: 'test-image.jpg',
      extension: 'jpg',
      type: 'image/jpg',
      url: 'http://test.image.com/image.jpg'
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} value={VALUE} readonly />
    );
    const readonly = getByTestId(container, INPUT_ID);
    expect(readonly.tagName).toEqual('DIV');
    expect(readonly.classList).toContain(DEFAULT_READONLY_CLASS);
    const [name, thumb] = readonly.childNodes;
    expect(name.textContent).toEqual(VALUE.name);
    expect(thumb.tagName).toEqual('IMG');
    expect(thumb.src).toEqual(VALUE.url);
  });

  it('should accept the readonly flag for a non-image', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = {
      name: 'test-file.pdf',
      extension: 'pdf',
      type: 'application/pdf',
      url: 'http://test.file.com/file.pdf'
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} value={VALUE} readonly />
    );
    const readonly = getByTestId(container, INPUT_ID);
    expect(readonly.tagName).toEqual('DIV');
    expect(readonly.classList).toContain(DEFAULT_READONLY_CLASS);
    const [name, icon] = readonly.childNodes;
    expect(name.textContent).toEqual(VALUE.name);
    expect(icon.tagName).toEqual('DIV');
    expect(icon.classList).toContain('document-icon-pdf');
  });

  it('should be in an error state when the error is set', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const ERROR = 'This is in error';
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} error={ERROR} />
    );
    const { wrapper } = checkSetup(container, INPUT_ID);
    expect(wrapper.classList).toContain(`${DEFAULT_CLASS}--error`);
  });

  it('should not be in an error state when the error is an empty string', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const ERROR = '';
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} error={ERROR} />
    );
    const { wrapper } = checkSetup(container, INPUT_ID);
    expect(wrapper.classList).not.toContain(`${DEFAULT_CLASS}--error`);
  });

  it('should fire the onChange event when a file is uploaded', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const str = JSON.stringify({ alpha: 'bravo' });
    const blob = new Blob([str]);
    const FILE = new File([blob], 'test.json', { type: 'application/JSON', });
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e);
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} onChange={ON_CHANGE} />
    );
    const { wrapper, input } = checkSetup(container, INPUT_ID);
    expect(wrapper.childNodes.length).toEqual(2); // input + label
    expect(ON_CHANGE_CALLS.length).toEqual(0);
    user.upload(input, FILE);
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(input.files.length).toEqual(1);
    expect(wrapper.childNodes.length).toEqual(4); // input + label + icon + remove button
    const [ , , icon, remove ] = wrapper.childNodes;
    expect(icon.tagName).toEqual('DIV');
    expect(icon.classList).toContain('document-icon-json');
    expect(remove.tagName).toEqual('BUTTON');
    expect(remove.textContent).toEqual('Remove');
  });

  it('should display a thumbnail from a url appropriately', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = {
      name: 'test-image.jpg',
      extension: 'jpg',
      type: 'image/jpg',
      url: 'http://test.image.com/image.jpg'
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} value={VALUE} />
    );
    const { wrapper } = checkSetup(container, INPUT_ID);
    const [ , label, thumb ] = wrapper.childNodes;
    expect(label.textContent).toContain(VALUE.name);
    expect(thumb.tagName).toEqual('IMG');
    expect(thumb.src).toEqual(VALUE.url);
  });

  it('should handle removal of a file appropriately', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = {
      name: 'test-image.jpg',
      extension: 'jpg',
      type: 'image/jpg',
      url: 'http://test.image.com/image.jpg'
    };
    const ON_CHANGE_CALLS = [];
    const ON_CHANGE = (e) => {
      ON_CHANGE_CALLS.push(e);
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} value={VALUE} onChange={ON_CHANGE} />
    );
    const { wrapper } = checkSetup(container, INPUT_ID);
    const [ , label, thumb, remove ] = wrapper.childNodes;
    expect(label.textContent).toContain(VALUE.name);
    expect(thumb.tagName).toEqual('IMG');
    expect(thumb.src).toEqual(VALUE.url);

    // Now click on the Remove button.
    fireEvent.click(remove, {});
    expect(wrapper.childNodes.length).toEqual(2); // Removed the thumb and remove button.

    // The onChange handler should also have fired.
    expect(ON_CHANGE_CALLS.length).toEqual(1);
    expect(ON_CHANGE_CALLS[0]).toMatchObject({
      target: {
        name: INPUT_FIELD_ID,
        value: undefined
      }
    });
  });

  it('should handle removal of a file without an onChange handler specified', async () => {
    const INPUT_ID = 'input';
    const INPUT_FIELD_ID = 'inputFieldId';
    const VALUE = {
      name: 'test-image.jpg',
      extension: 'jpg',
      type: 'image/jpg',
      url: 'http://test.image.com/image.jpg'
    };
    const { container } = render(
      <FileUpload data-testid={INPUT_ID} id={INPUT_ID} fieldId={INPUT_FIELD_ID} value={VALUE} />
    );
    const { wrapper } = checkSetup(container, INPUT_ID);
    const [ , label, thumb, remove ] = wrapper.childNodes;
    expect(label.textContent).toContain(VALUE.name);
    expect(thumb.tagName).toEqual('IMG');
    expect(thumb.src).toEqual(VALUE.url);

    // Now click on the Remove button.
    fireEvent.click(remove, {});
    expect(wrapper.childNodes.length).toEqual(2); // Removed the thumb and remove button.
  });

});
