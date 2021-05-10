using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Users
{
    public class RegisterModel
    {
        [Required]
        [RegularExpression("^[a-zA-Z0-9]*$")]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [RegularExpression("^[a-zA-Z-]*$")]
        public string FirstName { get; set; }
        [RegularExpression("^[a-zA-Z]*$")]
        public string LastName { get; set; }
        //[Required]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
