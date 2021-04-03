using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebAPI.Entities;

namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        private readonly ILoggerFactory _loggerFactory = LoggerFactory.Create(config => config.AddConsole());
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .ToTable("Users");
            builder.Entity<User>().HasIndex(u => u.Id)
                .IsUnique();
            builder.Entity<User>().HasIndex(u => u.Username)
                .IsUnique();
            builder.Entity<User>().HasIndex(u => u.Email)
                .IsUnique();
            
            
            
            builder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(b => b.Posts)
                .HasForeignKey(p => p.IdUser)
                .HasConstraintName("ForeignKey_Post_User")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
