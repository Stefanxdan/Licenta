using System.ComponentModel.DataAnnotations;
using WebAPI.Entities;

namespace WebAPI.Models.Users
{
    public class UserPostNumberResponse : BaseEntity
    {
          public string Username { get;  set; }
            [EmailAddress]
            public string Email { get;  set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Role { get;  set; }
            public string PhoneNumber { get; set; }
            public int PostsNumber { get; set; }
    }
}