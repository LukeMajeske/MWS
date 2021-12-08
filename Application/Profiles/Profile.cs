using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username {get; set;}
        public string DisplayName { get; set; }
        public string Bio {get; set;}

        public bool isOwner { get; set; }
        public bool isAssignedTo { get; set; }
        public bool isWatching { get; set; }
    }
}