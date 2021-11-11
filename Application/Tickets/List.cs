using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<TicketDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TicketDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<TicketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tickets = await _context.Tickets
                .Include(tu => tu.TicketUser)
                .ThenInclude(u => u.AppUser)
                .ToListAsync();

                var ticketsDto = _mapper.Map<List<TicketDto>>(tickets);

                var ticketsDto_withusers = new List<TicketDto>();

                ticketsDto.ForEach(async (ticket) => {
                    if(ticket.User.Count == 0){
                        var del_ticket = await _context.Tickets.FindAsync(ticket.Id);
                        _context.Tickets.Remove(del_ticket);
                    }
                    else{
                        ticketsDto_withusers.Add(ticket);
                    }
                    
                });

                return Result<List<TicketDto>>.Success(ticketsDto_withusers);

            }
        }
    }
}