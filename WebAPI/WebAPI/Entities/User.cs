using System;
using System.Text.Json.Serialization;

namespace WebAPI.Entities
{
    public class User : BaseEntity
    {
        private User()
        {
        }
        public User(string username, string email, string fname, string lname, string pwd, string rol, string phone)
        {
            Id = Guid.NewGuid();
            TimeAdded = DateTime.UtcNow;
            Username = username;
            Email = email;
            FirstName = fname;
            LastName = lname;
            Password = pwd;
            Role = rol;
            PhoneNumber = phone;
        }

        public string Username { get; private set; }
        public string Email { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Role { get; private set; }
        public string PhoneNumber { get; set; }

        [JsonIgnore]
        public string Password { get; private set; }
    }
}
