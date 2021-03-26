using System;

namespace WebAPI.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public DateTime TimeAdded { get; set; }
    }
}
