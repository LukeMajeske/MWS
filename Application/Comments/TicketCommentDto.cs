using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class TicketCommentDto
    {
        public int Id { get; set; }

        public DateTime CreateAt { get; set; }

        public string Body { get; set; }

        public string Username { get; set; }
    }
}