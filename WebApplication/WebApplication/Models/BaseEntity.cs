using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication.Models
{
    public abstract class BaseEntity
    {
        public Guid Id { get; protected set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
    }
}
