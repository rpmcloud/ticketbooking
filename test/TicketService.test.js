import TicketService from "../src/ticketing/TicketService.js"

describe('ticketbooking', function() {
    // Test request data
    const happyRequest = {
        accountId: 234,
        adult: 5,
        child: 1,
        infant: 3
    }
    const noAdultRequest = {
        accountId: 234,
        adult: 0,
        child: 1,
        infant: 3
    }
    const negativeRequest = {
        accountId: 234,
        adult: 5,
        child: -1,
        infant: 3
    }
    const highInfantsRequest = {
        accountId: 234,
        adult: 5,
        child: 1,
        infant: 8
    }
    const limitBreachRequest = {
        accountId: 234,
        adult: 15,
        child: 8,
        infant: 8
    }

    // Generate an object of TicketService class
    const ticketService = new TicketService();
    
    // The optimal flow within all validation limits
    it('happy-path', function() {
      let result = ticketService.bookTicket(happyRequest);
      expect(result).toBe("6 seats have been booked succesfully and £110 has been debited from your account");   
    })

    // When a ticket is booked without atleast an adult ticket
    it('no-adult', function() {
        let result = ticketService.bookTicket(noAdultRequest);
        expect(result).toBe("Please purchase atleast one valid adult ticket");   
    })

    // When any of the ticket count is less than zero
    it('negative-value', function() {
        let result = ticketService.bookTicket(negativeRequest);
        expect(result).toBe("Please enter a valid count greater than 0");   
    })

    // When there are more infants than the number of adult tickets
    it('high-infants', function() {
        let result = ticketService.bookTicket(highInfantsRequest);
        expect(result).toBe("Number of infants cannot be greater than number of adults");   
    })

    // When an user tries to book more than the maximum allowed tickers (i.e. 20)
    it('limit-breach', function() {
        let result = ticketService.bookTicket(limitBreachRequest);
        expect(result).toBe("Only a maximum of 20 seats could be purchased at a time");   
    })
});