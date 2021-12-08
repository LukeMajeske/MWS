using System;
using System.Collections.Generic;

namespace Domain
{
    public class Ticket
    {
    
        public Guid Id { get; set; }

        public DateTime Date {get; set;} = DateTime.UtcNow;

        public DateTime DueDate{ get; set; }

        //Should be in a separate table
        // public DateTime LastUpdated {get; set;} = DateTime.UtcNow;

        // public AppUser UpdatedBy { get; set; }

        public string Site { get; set; }

        public string Subject { get; set; }

        public string Description{get; set;}

        public string Status {get; set;} = "OPEN";

        public string Priority {get; set;} = "Low";


        public ICollection<TicketUser> TicketUser{get; set;} = new List<TicketUser>();

        public ICollection<TicketComment> Comments { get; set; } = new List<TicketComment>();
        //public string Status { get; set; }

    }
}