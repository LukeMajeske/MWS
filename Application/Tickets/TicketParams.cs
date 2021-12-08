using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Tickets
{
    public class TicketParams
    {
        public bool isAssignedTo { get; set; }

        public bool isWatching { get; set; }

        public bool isOwner { get; set; }

        public DateTime StartDate { get; set; }
    }
}