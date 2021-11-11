using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<TicketCommentDto>>
        {
            public string Body { get; set; }

            public Guid TicketId {get; set;}
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }

            public class Handler : IRequestHandler<Command, Result<TicketCommentDto>>
            {
                private readonly DataContext _context;
                private readonly IMapper _mapper;
                private readonly IUserAccessor _userAccesor;
                public Handler(DataContext context, IMapper mapper, IUserAccessor userAccesor)
                {
                    _userAccesor = userAccesor;
                    _mapper = mapper;
                    _context = context;
                    
                }

                public async Task<Result<TicketCommentDto>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var ticket = await _context.Tickets.FindAsync(request.TicketId);

                    if(ticket == null) return null;

                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());

                    var comment = new TicketComment{
                        Author = user,
                        Ticket = ticket,
                        Body = request.Body
                    };

                    ticket.Comments.Add(comment);

                    var success = await _context.SaveChangesAsync() > 0;

                    if(success) return Result<TicketCommentDto>.Success(_mapper.Map<TicketCommentDto>(comment));

                    return Result<TicketCommentDto>.Failure("Failed to add ticket comment.");

                }
            }
        }
    }
}