using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;

namespace Application.Tickets
{
    public class TicketDto
    {
        public Guid Id { get; set; }

        public DateTime Date {get; set;}

        public string Username { get; set; }

        public string Site { get; set; }

        public string Subject { get; set; }

        public string Description{get; set;}

        public ICollection<Profile> User{get; set;}
    }
}