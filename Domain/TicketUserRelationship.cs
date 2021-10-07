using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class TicketUserRelationship
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}