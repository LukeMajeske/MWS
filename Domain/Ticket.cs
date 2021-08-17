using System;

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

    }
}