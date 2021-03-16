using System;
using System.Linq;
using WebApplication.Models;

namespace WebApplication.Services
{
    public interface IUserService
    {
        IQueryable<User> GetAllUsers();
        User GetUserById(Guid id);
        User AddUser(User user);
    }
}
