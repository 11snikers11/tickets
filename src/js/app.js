import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import "../css/style.css";
import "./plugins";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI._form;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  async function initApp() {
    await locations.init();
    formUI.setAutocomleteData(locations.shortList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodebyKey(formUI.originValue);
    const destination = locations.getCityCodebyKey(formUI.destintationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
