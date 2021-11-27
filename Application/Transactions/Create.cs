using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Transactions
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserPayment Transaction{get; set;}

            /*public Guid Id { get; set; }

            public decimal Amount { get; set; }

            public string Description { get; set; }

            public string Service{get; set;} 

            public string TransactionType{get; set;}

            public Guid UserId { get; set; }*/
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.Transaction.UserId);

                request.Transaction.User = user;
                /*var transaction = new UserPayment{
                    Id = request.Id,
                    Amount = request.Amount,
                    Description = request.Description,
                    Service = request.Service,
                    TransactionType = request.TransactionType,
                    User = user
                };*/

                await _context.UserPayments.AddAsync(request.Transaction);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create Transaction");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}