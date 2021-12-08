using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProgressNote
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public AppUser Author { get; set; }

        public Website Website { get; set; }

        public int ProgressAmount {get; set;} 

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}