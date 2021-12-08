using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Application.Profiles;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;        
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly DataContext _context;
        
        private readonly IMapper _mapper;
        public AccountController(DataContext context,UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService, 
        RoleManager<IdentityRole> roleManager,
        IMapper mapper)
        {
            _context = context;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (result.Succeeded)
        {   
            var userDto = await CreateUserObject(user);
            
            user.Websites = await _context.Website
            .Where(w => w.User.Id == user.Id)
            .ToListAsync(); 

            userDto.Websites = _mapper.Map<IList<Application.Profiles.WebsiteDto>>(user.Websites);
            userDto.Role = await _userManager.GetRolesAsync(user);

            return userDto;
        }

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            return BadRequest("Email Taken");
        }
        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
        {
            return BadRequest("Username Taken");
        }

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Username,

        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user,"Client");
            return await CreateUserObject(user);
        }
        return BadRequest("Problem Registering User");
    }

    [HttpPost("website")]
    public async Task<ActionResult> CreateWebsite(WebsiteDto site){
        var new_site = _mapper.Map<Website>(site);

        var user = await _userManager.FindByIdAsync(site.userId);

        if(user == null) return null;
        
        new_site.User = user;

        await _context.Website.AddAsync(new_site);

        await _context.SaveChangesAsync();

        return Ok();
    }

    
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        var userDto = await CreateUserObject(user);

        user.Websites = await _context.Website
        .Where(w => w.User.Id == user.Id)
        .ToListAsync(); 

        userDto.Websites = _mapper.Map<IList<Application.Profiles.WebsiteDto>>(user.Websites);
        userDto.Role = await _userManager.GetRolesAsync(user);

        return userDto;

    }
    
    [HttpGet("role")]
    public async Task<IList<string>> GetCurrentRole(string id = null)
    {
        if(id == null){
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            var role = await _userManager.GetRolesAsync(user);
            return role;
        }
        else{
            var user = await _userManager.FindByIdAsync(id);
            var role = await _userManager.GetRolesAsync(user);
            return role;
        }
    }

    [Authorize(Roles = "SuperAdmin")]
    [HttpGet("allusers")]
    public async Task<List<Application.Profiles.UserSimpleDto>> GetAllUsers(){
        var result = await _userManager.Users
        .Include(u => u.Websites)
        .ToListAsync();

        
        var clients = _mapper.Map<List<Application.Profiles.UserSimpleDto>>(result);


         /*clients.ForEach(async (client) => {
            var user = await _userManager.FindByIdAsync(client.Id);
            client.Role = await _userManager.GetRolesAsync(user);
            });*/

            foreach(var client in clients)
            {
                var user = await _userManager.FindByIdAsync(client.Id);
                client.Role = await _userManager.GetRolesAsync(user);
            }



        return clients;
    }

    [Authorize(Roles = "SuperAdmin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(string id){
        var user = await _userManager.FindByIdAsync(id);

        //NOTE:Delete any tickets that belong to the user when they are deleted?
        
        var result = await _userManager.DeleteAsync(user);

        if(result.Succeeded){
            return Ok();
        }
        return BadRequest("Problem Deleting User");
    }

    private async Task<UserDto> CreateUserObject(AppUser user)
    {
        return new UserDto
        {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user,_userManager),
        };

    }
}
}