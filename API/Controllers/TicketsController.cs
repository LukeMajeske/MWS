using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Tickets;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    [Authorize(Roles = "SuperAdmin")]
    public class TicketsController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(Guid id)
        {   
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditTicket(Guid id, Ticket ticket)
        {
            ticket.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Ticket = ticket}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTicket(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(Ticket ticket)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Ticket = ticket}));
        }


    }
}