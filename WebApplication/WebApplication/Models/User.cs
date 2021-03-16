using System;
using System.Text.Json.Serialization;

namespace WebApplication.Models
{
    public class User : BaseEntity
    {
        public String UserName { get; set; }
        [JsonIgnore]
        public String Password { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
    }
}
