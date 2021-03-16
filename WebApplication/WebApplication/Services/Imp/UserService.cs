using System;
using System.Linq;
using WebApplication.Models;
using WebApplication.Repositories;

namespace WebApplication.Services.Imp
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public User AddUser(User user)
        {
            _repository.Add(user);
            return user;
        }

        public IQueryable<User> GetAllUsers()
        {
            return _repository.GetAll();
        }

        public User GetUserById(Guid id)
        {
            return _repository.GetById(id);
        }
    }
}
