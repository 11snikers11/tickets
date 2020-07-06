import api from "../services/apiService";
import { formatDate } from "../helper/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortList = null;
    this.airlines = null;
    this.lastSearch = null;
    this.formatDate = helpers.formatDate;
  }
  async init() {
    const response = await Promise.all([this.api.countries(), this.api.cities(), this.api.airlines()]);
    const [countries, cities, airlines] = response;
    this.countries = this.serializeConutries(countries);
    this.cities = this.serializeCities(cities);
    this.shortList = this.createShortList(this.cities);
    this.airlines = this.serializeAirlines(airlines);

    return response;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : "";
  }

  getAirlinesLogo(code) {
    return this.airlines[code] ? this.airlines[code].logo : "";
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/50/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  createShortList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = this.api.returnCountryFlag(city.country_code);
      return acc;
    }, {});
  }

  serializeConutries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const countryName = this.getCountryNameByCode(city.country_code);
      city.name = city.name || city.name_translations.en;
      const cityName = city.name || city.name_translations.en;
      const full_name = `${cityName} (${countryName})`;
      acc[city.code] = {
        ...city,
        countryName,
        full_name,
      };
      return acc;
    }, {});
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  getCityCodebyKey(key) {
    const city = Object.values(this.cities).find((item) => item.full_name === key);
    return city.code;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlinesLogo(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"),
      };
    });
  }
}

const locations = new Locations(api, { formatDate });

export default locations;
