using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Transactions
{
    public class List
    {
        public class Query : IRequest<Result<List<TransactionDto>>>
        {
            public string Username {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<List<TransactionDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<TransactionDto>>> Handle(Query result, CancellationToken cancellationToken)
            {
                var transactions = await _context.UserPayments
                    .Where(u => u.User.UserName == result.Username)
                    .OrderBy(t => t.CreateTime)
                    .ProjectTo<TransactionDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<TransactionDto>>.Success(transactions);
            }
        }
    }
}