using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProgressNotes
{
    public class List
    {
        public class Query : IRequest<Result<List<ProgressNoteDto>>>
        {
            public Guid WebsiteId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProgressNoteDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ProgressNoteDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var progressNotes = await _context.ProgressNotes
                    .Where(p => p.Website.Id == request.WebsiteId)
                    .OrderBy(p => p.CreateAt)
                    .ProjectTo<ProgressNoteDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ProgressNoteDto>>.Success(progressNotes);
            }
        }
    }
}