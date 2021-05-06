using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;
using WebAPI.Entities;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WebAPI.Models.Users;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        //private readonly IMapper _mapper;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Authenticate(AuthenticationRequest request)
        {
            var authResponse = await _userService.Authenticate(request.Username, request.Password);
            return authResponse == null ? NotFound() : Ok(authResponse);
        }
        
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateUser(RegisterModel user)
        {
            var userCreated = await _userService.AddUser(user);
            return userCreated == null ? BadRequest("Username or email taken.") : Ok(userCreated);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }
        
        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
                return NotFound();
            
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
                user.Email = null;
            else if (id != Guid.Parse(currentUser) && !User.IsInRole(Role.Admin))
                    user.Email = null;
            return Ok(user);
        }
        
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateUserModel request)
        {
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
            {
                return BadRequest("You are not logged in");
            }
                
            var currentUserId = Guid.Parse(currentUser);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            var response = await _userService.UpdateUser(id, request);
            if (!response)
            {
                return NotFound(id);
            }

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
            {
                return BadRequest("You are not logged in");
            }
                
            var currentUserId = Guid.Parse(currentUser);
            if (id != currentUserId && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }
            var response = await _userService.DeleteUser(id);
            if (!response)
            {
                return NotFound(id);
            }

            return NoContent();
        }
    }
}
