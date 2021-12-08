using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class UpdateWatchers
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid TicketId { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null) return null;

                var ticket = await _context.Tickets
                    .Include(t => t.TicketUser)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.TicketId);

                if(ticket == null) return null;

                var ticketUser = ticket.TicketUser.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
                if(ticketUser != null){
                    ticketUser.isWatching = !ticketUser.isWatching;
                }
                else{
                    ticketUser = new TicketUser{
                        Ticket = ticket,
                        AppUser = user,
                        isWatching = true
                    };
                    ticket.TicketUser.Add(ticketUser);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update watch list");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}