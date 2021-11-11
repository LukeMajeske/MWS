using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class TicketComment
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public AppUser Author { get; set; }

        public Ticket Ticket { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}