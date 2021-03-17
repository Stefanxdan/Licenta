using Microsoft.EntityFrameworkCore;
using WebApplication.Entities;

namespace WebApplication.Data
{
    public class DataContext : DbContext
    {   
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }
}
