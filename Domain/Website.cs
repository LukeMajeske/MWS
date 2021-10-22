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

        public ICollection<UserWebsite> User{ get; set; } = new List<UserWebsite>();
    }
}