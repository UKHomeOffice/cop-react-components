import { default as COLOURS } from './Colours.stories.json';

export const Colours = [];
export const ColoursAsRefData = [];

const setupColours = () => {
  Colours.length = 0;
  ColoursAsRefData.length = 0;
  COLOURS.forEach(colour => {
    Colours.push({
      value: colour.Code,
      label: colour.Name
    });
    ColoursAsRefData.push({
      value: colour.Code,
      label: colour.Name
    });
  });
};

setupColours();
