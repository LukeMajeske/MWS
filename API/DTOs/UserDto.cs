using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }

        public IList<string> Role { get; set; }

        public IList<Application.Profiles.WebsiteDto> Websites {get; set;}
    }
}