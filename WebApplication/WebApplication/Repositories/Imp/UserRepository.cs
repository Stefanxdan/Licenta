using System;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Data;
using WebApplication.Models;

namespace WebApplication.Repositories.Imp
{
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
            return _context.Users.FirstOrDefault(u => u.UserName == username && u.Password == password);
        }
    }
}
