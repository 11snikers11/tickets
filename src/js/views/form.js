import { getAutocompleteInstance, getDatePickerInstance } from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms["locationsContros"];

    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.departDate = document.getElementById("departDate");
    this.returnDate = document.getElementById("returnDate");

    this.originAutocomleteInst = autocompleteInstance(this.origin);
    this.destinationAutocomleteInst = autocompleteInstance(this.destination);
    this.departDateInst = datePickerInstance(this.departDate);
    this.returnDateInst = datePickerInstance(this.returnDate);
  }

  get form() {
    return this.$_form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destintationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDateInst.toString();
  }

  get returnDateValue() {
    return this.returnDateInst.toString();
  }

  setAutocomleteData(data) {
    this.originAutocomleteInst.updateData(data);
    this.destinationAutocomleteInst.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
