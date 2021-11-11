using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
            
        }

        public async Task SendComment(Create.Command command)
        {
            var result =await _mediator.Send(command);
            var ticketId = command.TicketId.ToString();
            var commentDto = new {ticketId= ticketId, comment = result.Value};
            await Clients.Group(ticketId)
                .SendAsync("ReceiveComment", commentDto);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var ticketId = httpContext.Request.Query["ticketId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, ticketId);
            var result = await _mediator.Send(new List.Query{TicketId = Guid.Parse(ticketId)});
            var commentsDto = new {ticketId= ticketId[0], comments = result.Value};
            await Clients.Caller.SendAsync("LoadComments", commentsDto);
        }
    }
}