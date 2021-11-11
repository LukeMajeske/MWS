using System.Linq;
using Application.Comments;
using Application.Tickets;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ticket, Ticket>();
            CreateMap<Ticket, TicketDto>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.TicketUser));
            
            CreateMap<TicketUserRelationship, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));

            CreateMap<UserWebsite,Profiles.WebsiteDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.WebsiteId))
                .ForMember(d => d.Progress, o => o.MapFrom(s => s.Website.Progress))
                .ForMember(d => d.URL, o => o.MapFrom(s => s.Website.URL));

            CreateMap<AppUser, Profiles.UserSimpleDto>()
                .ForMember(d => d.Websites, o => o.MapFrom(s => s.Websites));

            CreateMap<TicketComment, TicketCommentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName));


        }
    }
}