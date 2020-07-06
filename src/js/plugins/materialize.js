import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import datesConfig from "../config/datesConfig";

const select = document.querySelectorAll("select");
M.FormSelect.init(select);

const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete, {
  minLength: 2,
});

const datePickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datePickers, {
  showClearBtn: true,
  format: "yyyy-mm",
  minDate: new Date(),
  defaultDate: new Date(),
  i18n: datesConfig,
});

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
