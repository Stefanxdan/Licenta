using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> CheckUsernameAndEmail(string username, string email);
        Task<User> GetByUsernameAndPassword(string username, string password);
    }

    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> Add(User entity)
        {
            await _dataContext.Users.AddAsync(entity);
            await _dataContext.SaveChangesAsync();
            return entity;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _dataContext.Users.ToListAsync();
        }

        public async Task<User> GetById(Guid id)
        {
            return await _dataContext.Users.FindAsync(id);
        }

        public async Task<User> CheckUsernameAndEmail(string username, string email)
        {
            return await _dataContext.Users.Where(u => u.Username == username && u.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User> GetByUsernameAndPassword(string username, string password)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u =>  u.Username == username && u.Password == password);
        }
    }
}
