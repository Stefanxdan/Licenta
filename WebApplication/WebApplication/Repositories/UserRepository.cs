using System;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Data;
using WebApplication.Entities;

namespace WebApplication.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByUsernameAndPassword(string username, string password);
    }

    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User Add(User entity)
        {
            _context.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public IQueryable<User> GetAll() => _context.Users.AsQueryable();

        public User GetById(Guid id) => _context.Users.Find(id);

        public User GetByUsernameAndPassword(string username, string password)
        {
            return _context.Users.SingleOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}
