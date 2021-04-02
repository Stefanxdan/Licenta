using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Entities
{
    public class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TimeAdded { get; set; }
    }
}
