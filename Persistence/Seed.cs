using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Persistence
{
    public class Seed
    {

        public static async Task SeedData(IConfigurationRoot _config, DataContext context, UserManager<AppUser> userManager, 
        RoleManager<IdentityRole> roleManager)
        {   
            if(!roleManager.Roles.Any()){
                var userRoles = new List<IdentityRole>
                {
                    new IdentityRole {Name = "SuperAdmin"},
                    new IdentityRole {Name = "Admin"},
                    new IdentityRole {Name = "Client"}
                };

                foreach (var role in userRoles){
                    await roleManager.CreateAsync(role);
                }

            }
            //Create Test Users
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "TestClient", UserName = "testclient", Email="testclient@test.com"},

                };


                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user, "Pa$$w0rd");

                    if(result.Succeeded){
                        await userManager.AddToRoleAsync(user,"Client");
                    }
                }
            }


             //Create Super Admin
            var superadmin = new AppUser{
                UserName = _config["SuperAdmin:SuperAdminUsername"],
                Email = _config["SuperAdmin:SuperAdminEmail"]
            };

            string superadminPWD = _config["SuperAdmin:SuperAdminPassword"];
            var superadmin_exists = await userManager.FindByEmailAsync(superadmin.Email);

            if(superadmin_exists == null){
                var result = await userManager.CreateAsync(superadmin, superadminPWD);
                if(result.Succeeded){
                    await userManager.AddToRoleAsync(superadmin,"SuperAdmin");
                }
            }


            await context.SaveChangesAsync();
        }
        
    }
}