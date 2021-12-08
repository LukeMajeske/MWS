using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProgressNotes
{
    public class Create
    {
        public class Command : IRequest<Result<ProgressNoteDto>>
        {
            public int ProgressAmount{get; set;}
            public string Body {get; set;}
            public Guid WebsiteId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<ProgressNoteDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<ProgressNoteDto>> Handle(Command request, CancellationToken cancellationToken)
            {   

                var website = await _context.Website.FindAsync(request.WebsiteId);
                
                if(website == null) return null;

                var author = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var progressNote = new ProgressNote{
                    Body = request.Body,
                    Author = author,
                    Website = website,
                    ProgressAmount = request.ProgressAmount
                };

                await _context.ProgressNotes.AddAsync(progressNote);

                var progressNoteDto = _mapper.Map<ProgressNoteDto>(progressNote);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Result<ProgressNoteDto>.Success(progressNoteDto);

                return Result<ProgressNoteDto>.Failure("Failed to create progress note.");
                
            }
        }
    }
}