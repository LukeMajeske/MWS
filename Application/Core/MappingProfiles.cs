using System.Linq;
using Application.Comments;
using Application.ProgressNotes;
using Application.Tickets;
using Application.Transactions;
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
                .ForMember(d => d.Users, o => o.MapFrom(s => s.TicketUser));
            
            CreateMap<TicketUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));

            CreateMap<Website,Profiles.WebsiteDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Progress, o => o.MapFrom(s => s.Progress))
                .ForMember(d => d.URL, o => o.MapFrom(s => s.URL));
            
            CreateMap<Profiles.WebsiteDto, Website>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Progress, o => o.MapFrom(s => s.Progress))
                .ForMember(d => d.URL, o => o.MapFrom(s => s.URL));

            CreateMap<AppUser, Profiles.UserSimpleDto>()
                .ForMember(d => d.Websites, o => o.MapFrom(s => s.Websites));

            CreateMap<TicketComment, TicketCommentDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName));

            CreateMap<UserPayment, TransactionDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));

            CreateMap<ProgressNote, ProgressNoteDto>()
                .ForMember(d => d.Author, o => o.MapFrom(s => s.Author))
                .ForMember(d => d.CreateAt, o => o.MapFrom(s => s.CreateAt));


        }
    }
}