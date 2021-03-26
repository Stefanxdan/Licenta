using System;
using System.Linq;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
    }

    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public User Add(User entity)
        {
            _dataContext.Users.Add(entity);
            _dataContext.SaveChanges();
            return entity;
        }

        public IQueryable<User> GetAll()
        {
            return _dataContext.Users.AsQueryable();
        }

        public User GetById(Guid id)
        {
            return _dataContext.Users.Find(id);
        }
    }
}
