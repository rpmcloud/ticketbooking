import TicketService from "./ticketing/TicketService.js"

const ticketTypeRequest = {
    accountId: 234,
    adult: 5,
    child: 1,
    infant: 3
}

var ticketService = new TicketService()
const status = ticketService.bookTicket(ticketTypeRequest)
console.log(status)