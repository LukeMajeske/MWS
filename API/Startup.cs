using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Tickets;
using AutoMapper;
using Application.Core;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.Interfaces;
using Infrastructure.Security;
using Domain;
using Microsoft.AspNetCore.Identity;
using FluentValidation.AspNetCore;
using API.Middleware;
using API.SignalR;
using Infrastructure.Services;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;

        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            }).AddFluentValidation(config => {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = _config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use connection string provided at runtime by Heroku.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                opt.UseNpgsql(connStr);
            });
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            services.AddIdentityServices(_config);

            services.AddScoped<IUserAccessor, UserAccessor>();

            services.AddScoped<IPaymentService, PaymentService>();

            services.AddSignalR(opt => {
                opt.EnableDetailedErrors = true;
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self())
                .FontSources(s => s.Self())
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ScriptSources(s => s.Self())
            );
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else{
                app.Use(async(context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapHub<ProgressHub>("/progress");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }


        private async Task CreateRolls(IConfiguration _config, IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
            //Create Super Admin
            var superadmin = new AppUser{
                UserName = _config.GetValue<string>("SuperAdmin:SuperAdminUsername"),
                Email = _config.GetValue<string>("SuperAdmin:SuperAdminEmail")
            };

            string superadminPWD = _config.GetValue<string>("SuperAdmin:SuperAdminPassword");
            var superadmin_exists = await userManager.FindByEmailAsync(superadmin.Email);

            if(superadmin_exists == null){
                var result = await userManager.CreateAsync(superadmin, superadminPWD);
                if(result.Succeeded){
                    await userManager.AddToRoleAsync(superadmin,"SuperAdmin");
                }
            }


        }
    }
}
