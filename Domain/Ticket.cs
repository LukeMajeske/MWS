using System;
using System.Collections.Generic;

namespace Domain
{
    public class Ticket
    {
    
        public Guid Id { get; set; }

        public DateTime Date {get; set;} = DateTime.UtcNow;

        public string Username { get; set; }

        public string Site { get; set; }

        public string Subject { get; set; }

        public string Description{get; set;}

        public ICollection<TicketUserRelationship> TicketUser{get; set;} = new List<TicketUserRelationship>();

        public ICollection<TicketComment> Comments { get; set; } = new List<TicketComment>();
        //public string Status { get; set; }

    }
}