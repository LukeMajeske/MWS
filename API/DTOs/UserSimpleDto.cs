using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    //Used to reference users within the system without assigning a token
    public class UserSimpleDto
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public IList<string> Role { get; set; }

        public IList<object> Websites {get; set;}
        
    }
}