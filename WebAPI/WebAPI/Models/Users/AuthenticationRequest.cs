using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Users
{
    public class AuthenticationRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
