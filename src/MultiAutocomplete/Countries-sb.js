import { default as COUNTRIES } from './Countries.stories.json';

export const Countries = [];
export const CountriesAsRefData = [];

const setupCountries = () => {
  Countries.length = 0;
  CountriesAsRefData.length = 0;
  COUNTRIES.forEach(country => {
    Countries.push({
      value: country.Code,
      label: country.Name
    });
    CountriesAsRefData.push({
      value: country.Code,
      label: country.Name
    });
  });
};

setupCountries();
