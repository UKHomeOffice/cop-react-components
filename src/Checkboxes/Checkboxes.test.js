import { getByTestId, render } from "@testing-library/react";
import { ContextExclusionPlugin } from "webpack";

import Checkboxes, { DEFAULT_CLASS } from "./Checkboxes";

describe("Checkboxes", () => {
  const OPTIONS = [
    { value: "england", label: "England" },
    { value: "scotland", label: "Scotland" },
    { value: "wales", label: "Wales" },
    { value: "northern-ireland", label: "Northern Ireland" },
  ];

  const checkSetup = (container, testId) => {
    const wrapper = getByTestId(container, testId);
    expect(wrapper.classList).toContain(DEFAULT_CLASS);
    return wrapper;
  };

  it("should appropriately set up the necessary components", async () => {
    const ID = "checkboxes";
    const FIELD_ID = "checkboxesFieldId";
    const HINT = "thisisahint";
    const { container } = render(
      <Checkboxes
        data-testid={ID}
        id={ID}
        fieldId={FIELD_ID}
        options={OPTIONS}
        hint={HINT}
      />
    );
    const wrapper = checkSetup(container, ID);
    expect(wrapper.childNodes.length).toEqual(OPTIONS.length + 1); //+1 for the hint

    const hint = wrapper.childNodes[0];
    expect(hint.classList).toContain("govuk-hint");
    expect(hint.innerHTML).toContain(HINT);

    OPTIONS.forEach((opt, index) => {
      const item = wrapper.childNodes[index + 1]; //+1 for the hint
      expect(item.classList).toContain(`${DEFAULT_CLASS}__item`);
      expect(item.innerHTML).toContain(opt.label);
      const input = item.childNodes[0];
      expect(input.id).toEqual(`${FIELD_ID}-${index}`);
      expect(input.name).toEqual(FIELD_ID);
      expect(input.value).toEqual(opt.value);
      expect(input.checked).toEqual(false);
    });
  });
});
