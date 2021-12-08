using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Website
    {
        public Guid Id { get; set; }

        public int Progress {get; set;}

        public string URL { get; set; }

        public AppUser User{ get; set; }

        public ICollection<ProgressNote> ProgressNotes {get; set;} =new List<ProgressNote>();
    }
}