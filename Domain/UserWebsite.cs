using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserWebsite
    {
        public Guid WebsiteId { get; set; }

        public Website Website { get; set; }

        public string AppUserId {get; set;}

        public AppUser AppUser { get; set; }
    }
}