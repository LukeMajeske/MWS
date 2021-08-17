using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context){
            if(context.Tickets.Any()) return;

            var tickets = new List<Ticket>{
                new Ticket{
                   Date = DateTime.Now,
                   Username = "P-Diddy",
                   Site = "P-Diddles.com",
                   Subject = "Site is broken",
                   Description = "A button doesn't work anymore"
                },
                new Ticket{
                   Date = DateTime.Now.AddDays(-2),
                   Username = "Monica",
                   Site = "ItMeMonica.com",
                   Subject = "Change Color of Button",
                   Description = "Change color of home button to green"
                },
                new Ticket{
                   Date = DateTime.Now.AddDays(-10),
                   Username = "tootiefroots12",
                   Site = "Beutify.com",
                   Subject = "Restyle my site",
                   Description = "Let's set up a meeting, I would like my site to look different"
                }
            };

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        } 
    }
}