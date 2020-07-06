class TicketsUI {
  constructor() {
    this.container = document.querySelector(".tickets-sections .row");
  }
  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMessage();
      return;
    }
    let fragment = "";
    tickets.forEach((element) => {
      const template = TicketsUI.ticketTemplate(element);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMessage() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-message">По вашему запросу билетов не найдено</ div>`;
  }

  static ticketTemplate(ticket) {
    return `
      <div class="col s12 m4">
        <div class="card white darken-1">
          <div class="card-content">
            <div class="ticket-airline d-flex align-items-center">
              <img class="ml-auro" src="${ticket.airline_logo}"/>
              <span>${ticket.airline_name}</span>
            </div>
            <div class="ticket-destinations d-flex align-items-center">
              <div class="d-flex align-items-center mr-auto">
                <span>${ticket.origin_name}</span>
                <i class="material-icons prefix">flight_takeoff</i>
              </div>
              <div class="d-flex align-items-center ml-auto">
                <i class="material-icons prefix">flight_land</i>
                <span>${ticket.destination}</span>
              </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
              <span>${ticket.departure_at}</span>
              <span class="ml-auto">${ticket.price}</span>
            </div>
            <div class="ticket-additional align-items-center">
              <span>Пересадок: ${ticket.transfers}</span>
              <span>Номер рейса: ${ticket.flight_number}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const ticketUI = new TicketsUI();

export default ticketUI;
