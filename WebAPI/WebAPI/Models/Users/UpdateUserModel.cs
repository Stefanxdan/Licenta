using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Users
{
    public class UpdateUserModel
    {
        [RegularExpression("^[a-zA-Z-]*$")]
        public string FirstName { get;  set; }
        [RegularExpression("^[a-zA-Z]*$")]
        public string LastName { get;  set; }
        [Phone]
        public string PhoneNumber { get; set; }
        public string Password { get;  set; }
    }
}