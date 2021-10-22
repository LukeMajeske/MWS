using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }


        public IdentityRole Role {get; set;}
        //public IdentityUserRole<string> Role {get; set;}
        public ICollection<TicketUserRelationship> Tickets { get; set; }

        public ICollection<UserWebsite> Websites {get; set;}
    }
}