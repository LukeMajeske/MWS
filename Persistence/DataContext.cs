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

        public DbSet<TicketUserRelationship> TicketUserRelationships {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //Ticket to User 
            builder.Entity<TicketUserRelationship>(x => x.HasKey(tu => new {tu.AppUserId, tu.TicketId}));

            builder.Entity<TicketUserRelationship>()
                .HasOne(u => u.AppUser)
                .WithMany(t => t.Tickets)
                .HasForeignKey(tu => tu.AppUserId);

            builder.Entity<TicketUserRelationship>()
                .HasOne(t => t.Ticket)
                .WithMany(u => u.TicketUser)
                .HasForeignKey(tu => tu.TicketId);


            builder.Entity<AppUser>()
            .HasOne(r => r.Role);
        }
    }
}