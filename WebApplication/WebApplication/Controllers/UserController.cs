using Microsoft.AspNetCore.Mvc;
using System;
using WebApplication.DTOs.Users;
using WebApplication.Entities;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userService.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetUserById(Guid id)
        {
            var result = _userService.GetById(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("register")]
        public IActionResult CreateUser([FromBody] CreateUser user)
        {
            var s = new User
            {
                Username = user.UserName,
                Password = user.Password,
                Name = user.Name,
                Email = user.Email
            };
            var result = _userService.Add(s);
            if (result == null)
                return BadRequest();
            return Created($"/users/{result.Id}", result);
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
