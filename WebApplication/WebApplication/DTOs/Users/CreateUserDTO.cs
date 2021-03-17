using System;

namespace WebApplication.DTOs.Users
{
    public class CreateUser
    {
        public String UserName { get; set; }
        public String Password { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
    }
}
