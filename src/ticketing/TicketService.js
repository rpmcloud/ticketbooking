/* eslint-disable */
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js"
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js"

// Fixed ticket prices
const ADULT_TICKET_PRICE = 20
const CHILD_TICKET_PRICE = 10

// Function to check if the count is a valid and acceptable number
// any future validation additions can go here
function isValidCount(count){
  // Returns true if count is an integer and is greater than zero
  return Number.isInteger(count) && count>0
}

export default class TicketService {
    bookTicket(ticketTypeRequest) {
      console.log("Booking in progress")

       // Extract values from request object
       const adult = ticketTypeRequest.adult ? ticketTypeRequest.adult : 0
       const child = ticketTypeRequest.child ? ticketTypeRequest.child : 0
       const infant = ticketTypeRequest.infant ? ticketTypeRequest.infant : 0

      // Check if atleast one adult ticket is booked
      if(!ticketTypeRequest.adult){
        return "Please purchase atleast one valid adult ticket"
      }

      // Perform validation on request data
      if(!isValidCount(adult) || !isValidCount(child) || !isValidCount(infant)) {
        return "Please enter a valid count greater than 0"
      }

      // Number of infants should be <= number of adult tickets
      if(infant > adult){
        return "Number of infants cannot be greater than number of adults"
      }

      // Calculate total tickets which include infants (since it is a ticket category)
      const totalTickets = adult + child + infant
      // Maximum seat allowed per booking is 20. Abort booking if this criteria fails.
      if(totalTickets > 20){
        return "Only a maximum of 20 seats could be purchased at a time"
      }

      // Seats to be booked only for adult and child categories
      const totalSeat = totalTickets - infant

      // Total booking cost calculation [type count * ticket type unit price]
      const totalCost = adult*ADULT_TICKET_PRICE + child*CHILD_TICKET_PRICE
      
      // Initiate payment
      const ticketPaymentService = new TicketPaymentService()
      ticketPaymentService.makePayment(ticketTypeRequest.accountId, totalCost)

      // Proceed with seat booking
      const seatReservationService = new SeatReservationService()
      seatReservationService.reserveSeat(ticketTypeRequest.accountId, totalSeat)

      // Show a success message with booking details
      return totalSeat + " seats have been booked succesfully and £"+totalCost + " has been debited from your account"
    }
  }
  