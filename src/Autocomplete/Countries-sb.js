import { default as COUNTRIES } from './Countries.stories.json';

export const Countries = [];
export const CountriesAsRefData = [];
export const CountriesByName = [];

const setupCountries = () => {
  Countries.length = 0;
  CountriesAsRefData.length = 0;
  CountriesByName.length = 0;
  COUNTRIES.forEach(country => {
    Countries.push({
      value: country.Code,
      label: country.Name
    });
    CountriesAsRefData.push({
      id: country.Code,
      name: country.Name
    });
    CountriesByName.push(country.Name);
  });
};

setupCountries();
