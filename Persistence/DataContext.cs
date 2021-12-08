using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Ticket> Tickets { get; set; }

        public DbSet<TicketUser> TicketUsers {get; set;}

        public DbSet<Website> Website {get; set;}

        public DbSet<TicketComment> TicketComments{get; set;}

        public DbSet<UserPayment> UserPayments{get; set;}

        public DbSet<ProgressNote> ProgressNotes{get; set;}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //Ticket to User 
            builder.Entity<TicketUser>(x => x.HasKey(tu => new {tu.AppUserId, tu.TicketId}));

            builder.Entity<TicketUser>()
                .HasOne(u => u.AppUser)
                .WithMany(t => t.Tickets)
                .HasForeignKey(tu => tu.AppUserId);

            builder.Entity<TicketUser>()
                .HasOne(t => t.Ticket)
                .WithMany(u => u.TicketUser)
                .HasForeignKey(tu => tu.TicketId);

            builder.Entity<TicketComment>()
            .HasOne(t => t.Ticket)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserPayment>()
            .HasOne(u => u.User)
            .WithMany(t => t.Transactions);

            builder.Entity<ProgressNote>()
            .HasOne(w => w.Website)
            .WithMany(p => p.ProgressNotes)
            .OnDelete(DeleteBehavior.Cascade);

        }
    }
}