using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class Post : BaseEntity
    {
        public Guid Id_user { get; set; }
        public bool IsLocal { get; set; }
        public bool ForRent { get; set; }
        public int Price { get; set; }
        public int Surface_built { get; set; }
        public int Surface_useful { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public string Type { get; set; }
        public string Condition { get; set; }
        public string Partitioning { get; set; }

    }
}
