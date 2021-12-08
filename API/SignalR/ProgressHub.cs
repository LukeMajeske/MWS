using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ProgressNotes;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ProgressHub : Hub
    {
        private readonly IMediator _mediator;
        public ProgressHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendProgressNote(Create.Command command)
        {
            var result =await _mediator.Send(command);
            var websiteId = command.WebsiteId.ToString();
            var noteDto = new {websiteId= websiteId, note = result.Value};
            await Clients.Group(websiteId)
                .SendAsync("ReceiveNote", noteDto);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var websiteId = httpContext.Request.Query["websiteId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, websiteId);
            var result = await _mediator.Send(new List.Query{WebsiteId = Guid.Parse(websiteId)});
            var notesDto = new {websiteId= websiteId[0], notes = result.Value};
            await Clients.Caller.SendAsync("LoadNotes", notesDto);
        }
    }
}