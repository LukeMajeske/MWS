using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Tickets
{
    public class TicketValidator : AbstractValidator<Ticket>
    {
        public TicketValidator()
        {
            RuleFor(x => x.Subject).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}