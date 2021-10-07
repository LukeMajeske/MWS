using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tickets;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TicketsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<TicketDto>>> GetTickets()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditTicket(Guid id, Ticket ticket)
        {
            ticket.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Ticket = ticket}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTicket(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult> CreateTicket(Ticket ticket)
        {
            return Ok(await Mediator.Send(new Create.Command{Ticket = ticket}));
        }


    }
}