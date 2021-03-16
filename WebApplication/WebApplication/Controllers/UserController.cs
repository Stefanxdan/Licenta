using Microsoft.AspNetCore.Mvc;
using System;
using WebApplication.DTOs;
using WebApplication.Models;
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
            return Ok(_userService.GetAllUsers());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(Guid id)
        {
            var result = _userService.GetUserById(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserDTO user)
        {
            var s = new User
            {
                UserName = user.UserName,
                Password = user.Password,
                Name = user.Name,
                Email = user.Email
            };
            var result = _userService.AddUser(s);
            if (result == null)
                return BadRequest();
            return Created($"/users/{result.Id}", result);
        }

    }
}
