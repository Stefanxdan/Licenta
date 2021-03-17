using System;
using System.Text.Json.Serialization;

namespace WebApplication.Entities
{
    public class User : BaseEntity
    {
        public String Username { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }

        [JsonIgnore]
        public String Password { get; set; }
    }
}
