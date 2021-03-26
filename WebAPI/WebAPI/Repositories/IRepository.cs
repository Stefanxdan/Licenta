using System;
using System.Linq;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        T GetById(Guid id);
        IQueryable<T> GetAll();
        T Add(T entity);
    }
}
