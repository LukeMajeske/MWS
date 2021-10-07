using System;
using System.Collections.Generic;

namespace Domain
{
    public class Ticket
    {
    
        public Guid Id { get; set; }

        public DateTime Date {get; set;}

        public string Username { get; set; }

        public string Site { get; set; }

        public string Subject { get; set; }

        public string Description{get; set;}

        public ICollection<TicketUserRelationship> TicketUser{get; set;} = new List<TicketUserRelationship>();
        //public string Status { get; set; }

    }
}