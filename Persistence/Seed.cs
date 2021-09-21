using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bobbieboy", Email="bob@test.com"},
                    new AppUser{DisplayName = "Monica", UserName = "ItMeMon", Email="monica@test.com"},
                    new AppUser{DisplayName = "P-Diddy", UserName = "pdiddles", Email="p@diddy.com"},
                    new AppUser{DisplayName = "Smackelmore", UserName = "smackelmore", Email="smack@smack.com"},

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }


            }


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