using System;
using System.Linq;
using WebApplication.Entities;

namespace WebApplication.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        T GetById(Guid id);
        IQueryable<T> GetAll();
        T Add(T entity);
    }
}