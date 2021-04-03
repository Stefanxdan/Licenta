using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WebAPI.Entities
{
    public class User : BaseEntity
    {
        public string Username { get;  set; }
        [EmailAddress]
        public string Email { get;  set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get;  set; }
        public string PhoneNumber { get; set; }
        [JsonIgnore]
        public string Password { get; set; }

        public List<Post> Posts { get; set; }
    }
}
