using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<List<TicketDto>>> 
        {
            public TicketParams Params {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<TicketDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

             private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<TicketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Tickets
                .Where(d => d.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<TicketDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                if(request.Params.isAssignedTo)
                {
                    query = query
                    .Where(x => x.Users
                    .Any(u => u.Username == _userAccessor.GetUsername() & u.isAssignedTo == true));
                }

                if(request.Params.isWatching)
                {
                    query = query
                    .Where(x => x.Users
                    .Any(u => u.Username == _userAccessor.GetUsername() & u.isWatching == true));
                }

                if(request.Params.isOwner)
                {
                    query = query
                    .Where(x => x.Users
                    .Any(u => u.Username == _userAccessor.GetUsername() & u.isAssignedTo == true));
                }

                var tickets = await query.ToListAsync();


                return Result<List<TicketDto>>.Success(tickets);

            }
        }
    }
}